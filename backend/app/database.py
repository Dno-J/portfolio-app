from sqlmodel import create_engine, Session
from app.settings import settings

# ===================== Database Configuration =====================
DATABASE_URL = settings.DATABASE_URL

# Create SQLModel engine with SSL mode for NeonDB
# echo=True prints SQL logs, useful for debugging. Disable in production if verbose.
engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"sslmode": "require"}
)

# ===================== Dependency =====================
def get_session():
    """
    Dependency to provide a SQLModel Session.
    Automatically closes the session after use.
    Use this in your FastAPI routes with Depends(get_session).
    """
    with Session(engine) as session:
        yield session
