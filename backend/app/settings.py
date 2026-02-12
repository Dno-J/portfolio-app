from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import List

# Go from backend/app/settings.py -> backend/app -> backend -> project root
BASE_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    DATABASE_URL: str

    ENV: str = "production"
    PORT: int = 8001

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ALLOWED_ORIGINS: List[str] = Field(default_factory=list)

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore"
    )

settings = Settings()

# Temporary debug (remove later)
print("ENV FILE LOADED FROM:", BASE_DIR / ".env")
print("ADMIN_USERNAME:", settings.ADMIN_USERNAME)
print("ADMIN_PASSWORD:", settings.ADMIN_PASSWORD)
print("DATABASE_URL:", settings.DATABASE_URL[:30] + "...")
