from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select, Session, SQLModel
from app.models import ContactForm, Contact
from app.database import get_session
from app.auth import authenticate_user, create_access_token, get_current_user
from app.settings import settings
from typing import List
from datetime import datetime
import csv
import io
import logging

# ===================== Logging Setup =====================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio Backend", version="1.0.0")
api_router = APIRouter()

# ===================== CORS Setup =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("Parsed ALLOWED_ORIGINS:", settings.ALLOWED_ORIGINS)

# ===================== Startup Event =====================
@app.on_event("startup")
def on_startup():
    from app.database import engine
    SQLModel.metadata.create_all(engine)

# ===================== Health Check =====================
@app.get("/", tags=["Health"])
def read_root():
    return {"message": "Portfolio backend is running!"}

@api_router.get("/ping", tags=["Health"])
def ping(session: Session = Depends(get_session)):
    try:
        session.exec(select(Contact).limit(1)).all()
        return {"message": "pong", "db": "ok"}
    except Exception as e:
        logger.error(f"DB ping failed: {e}")
        return {"message": "pong", "db": "error", "detail": str(e)}

# ===================== Authentication =====================
@api_router.post("/login", tags=["Auth"])
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if not authenticate_user(form_data.username, form_data.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}

# ===================== Contact Form =====================
@api_router.post("/contact", tags=["Contact"])
def submit_contact(form: ContactForm, session: Session = Depends(get_session)):
    try:
        contact = Contact(**form.dict())
        session.add(contact)
        session.commit()
        session.refresh(contact)
        return {"status": "success", "message": "Thanks for reaching out!"}
    except Exception as e:
        session.rollback()
        logger.error(f"Contact form submission failed: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# ===================== Protected Dashboard =====================
@api_router.get("/submissions", response_model=List[Contact], tags=["Admin"])
def get_submissions(session: Session = Depends(get_session), user: str = Depends(get_current_user)):
    return session.exec(select(Contact).order_by(Contact.timestamp.desc())).all()

# ===================== CSV Export =====================
@api_router.get("/export", tags=["Admin"])
def export_submissions(session: Session = Depends(get_session), user: str = Depends(get_current_user)):
    contacts = session.exec(select(Contact).order_by(Contact.timestamp.desc())).all()

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

# ===================== Mount API Router =====================
app.include_router(api_router, prefix="/api")
