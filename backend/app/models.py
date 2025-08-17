from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class ContactForm(SQLModel):
    """
    Pydantic model for contact form submission.
    """
    name: str
    email: str
    message: str

class Contact(ContactForm, table=True):
    """
    SQLModel table for storing contact submissions.
    Inherits ContactForm fields.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
