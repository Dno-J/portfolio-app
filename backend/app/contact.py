from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Contact(SQLModel, table=True):
    """
    Database model for storing contact form submissions.
    """
    id: Optional[int] = Field(default=None, primary_key=True, description="Unique ID of the contact")
    name: str = Field(nullable=False, description="Name of the person submitting the form")
    email: str = Field(nullable=False, description="Email address of the submitter")
    message: str = Field(nullable=False, description="Message from the contact form")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Submission timestamp (UTC)")
