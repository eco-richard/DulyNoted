from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tables import notes_tags

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Database columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    color = db.Column(db.Integer, nullable=False)

    # Relationships
    # Many-to-Many with notes
    user = db.relationship("User", back_populates="tags")
    notes = db.relationship("Note", secondary=notes_tags, back_populates="tags")

    def simple_tag(self):
        return {
            "id": self.id,
            "title": self.title,
            "color": self.color
        }

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.simple_user(),
            "title": self.title,
            "color": self.color,
            "notes": [note.to_dict() for note in self.notes],
        }
