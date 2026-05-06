from pathlib import Path
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/app/settings.py -> backend/app -> backend -> project root
BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    # Admin credentials
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str

    # Database
    DATABASE_URL: str

    # App environment
    ENV: str = "production"
    PORT: int = 8001

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    ALLOWED_ORIGINS: List[str] = Field(default_factory=list)

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore",
    )


settings = Settings()