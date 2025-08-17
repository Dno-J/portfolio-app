from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.settings import settings

# ===================== Config =====================
SECRET_KEY = settings.JWT_SECRET_KEY
ALGORITHM = settings.JWT_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# ===================== OAuth2 / Admin Credentials =====================
BACKEND_URL = f"http://localhost:{settings.PORT}"  # Optional: dynamic token URL
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
ADMIN_USERNAME = settings.ADMIN_USERNAME
ADMIN_PASSWORD = settings.ADMIN_PASSWORD

# ===================== Helper Functions =====================
def authenticate_user(username: str, password: str) -> bool:
    """Check if username and password match admin credentials"""
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a JWT token with expiration"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    """Dependency to get current authenticated user from token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
