from pydantic import BaseSettings, Field
from typing import List

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

    class Config:
        env_file = "../.env"

settings = Settings()
