from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, SQLModel
from app.models import ContactForm, Contact
from app.database import get_session
from app.auth import authenticate_user, create_access_token, get_current_user
from typing import List
from datetime import datetime
import csv
import io
import logging

# ===================== Logging Setup =====================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio Backend", version="1.0.0")

# ===================== CORS Setup =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",   # React frontend in Docker
        "http://localhost:3001",   # React dev server
        "http://127.0.0.1:3000",   # Alternative localhost
        "http://127.0.0.1:3001",   # Alternative localhost
        "https://portfolio.yourdomain.com",  # Production domain (replace with real)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== Startup Event =====================
@app.on_event("startup")
def on_startup():
    """
    Create database tables automatically on startup if they don't exist.
    """
    from app.database import engine
    SQLModel.metadata.create_all(engine)

# ===================== Health Check =====================
@app.get("/", tags=["Health"])
def read_root():
    return {"message": "Portfolio backend is running!"}

@app.get("/ping", tags=["Health"])
def ping():
    return {"message": "pong"}

# ===================== Authentication =====================
@app.post("/login", tags=["Auth"])
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate user with username/password and return JWT token.
    """
    if not authenticate_user(form_data.username, form_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

# ===================== Contact Form =====================
@app.post("/contact", tags=["Contact"])
def submit_contact(form: ContactForm, session: Session = Depends(get_session)):
    """
    Submit a contact form and store it in the database.
    """
    contact = Contact(**form.dict())
    session.add(contact)
    session.commit()
    session.refresh(contact)

    # Logging for server console instead of print()
    logger.info(f"New contact: {contact.name} <{contact.email}>")
    logger.info(f"Message: {contact.message}")

    return {"status": "success", "message": "Thanks for reaching out!"}

# ===================== Protected Dashboard =====================
@app.get("/submissions", response_model=List[Contact], tags=["Admin"])
def get_submissions(
    session: Session = Depends(get_session),
    user: str = Depends(get_current_user)
):
    """
    Return all contact submissions for authenticated admin user.
    """
    return session.query(Contact).order_by(Contact.timestamp.desc()).all()

# ===================== CSV Export =====================
@app.get("/export", tags=["Admin"])
def export_submissions(
    session: Session = Depends(get_session),
    user: str = Depends(get_current_user)
):
    """
    Export contact submissions to CSV for authenticated admin user.
    """
    contacts = session.query(Contact).order_by(Contact.timestamp.desc()).all()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "Email", "Message", "Timestamp"])
    for c in contacts:
        writer.writerow([c.id, c.name, c.email, c.message, c.timestamp])

    output.seek(0)
    filename = f"submissions_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
