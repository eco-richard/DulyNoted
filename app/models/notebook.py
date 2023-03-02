from .db import db, environment, SCHEMA, add_prefix_for_prod

class Notebook(db.Model):
  __tablename__ = 'notebooks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  # Database columns
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  title = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.String(31), nullable=False)
  updated_at = db.Column(db.String(31), nullable=False)

  # Relationships
  user = db.relationship("User", back_populates="notebooks")
  notes = db.relationship("Note", back_populates="notebook",
                          cascade="all, delete-orphan");

  def simple_notebook(self):
    return {
      "id": self.id,
      "title": self.title
    }

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "user": self.user.simple_user(),
      "notes": [note.to_dict() for note in self.notes],
      "created_at": self.created_at,
      "updated_at": self.updated_at
    }
