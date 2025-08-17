from sqlmodel import create_engine, Session
import os

# ===================== Database Configuration =====================
# Read DATABASE_URL from environment variable.
# This allows easy switching between local Postgres, Docker, or Neon Postgres.
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@db:5432/portfolio"  # default local dev URL
)

# Create SQLModel engine
# echo=True prints SQL logs, useful for debugging. Disable in production if verbose.
engine = create_engine(DATABASE_URL, echo=True)

# ===================== Dependency =====================
def get_session():
    """
    Dependency to provide a SQLModel Session.
    Automatically closes the session after use.
    Use this in your FastAPI routes with Depends(get_session).
    """
    with Session(engine) as session:
        yield session
