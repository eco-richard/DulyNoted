from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tables import notes_tags

class Note(db.Model):
  __tablename__ = 'notes'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  # Database columns
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")))
  title = db.Column(db.String(255), nullable=False)
  body = db.Column(db.Text)
  created_at = db.Column(db.String(31), nullable=False)
  updated_at = db.Column(db.String(31), nullable=False)

  # Relationships
  user = db.relationship("User", back_populates="notes")
  notebook = db.relationship("Notebook", back_populates="notes")
  tags = db.relationship("Tag", secondary=notes_tags, back_populates="notes")

  def simple_note(self):
    return {
      "id": self.id,
      "notebook": self.notebook.simple_notebook() if self.notebook != None else "",
      "title": self.title,
      "body": self.body,
    }

  def single_note(self):
    return {
      "id": self.id,
      "user": self.user.simple_user(),
      "notebook": self.notebook.simple_notebook() if self.notebook != None else "",
      "title": self.title,
      "body": self.body,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
    }

  def to_dict(self):
    return {
      "id": self.id,
      "user": self.user.simple_user(),
      "tags": [tag.simple_tag for tag in self.tags],
      "notebook": self.notebook.simple_notebook() if self.notebook != None else "",
      "title": self.title,
      "body": self.body,
      "created_at": self.created_at,
      "updated_at": self.updated_at,
    }