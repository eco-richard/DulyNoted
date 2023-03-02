from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Database columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(31))
    last_name = db.Column(db.String(63))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    notes = db.relationship("Note", back_populates="user")
    notebooks = db.relationship("Notebook", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def simple_user(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.id,
            'last_name': self.id,
        }


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            "notes": [note.simple_note() for note in self.notes],
            "notebooks": [notebook.simple_notebook() for notebook in self.notebooks],
        }
