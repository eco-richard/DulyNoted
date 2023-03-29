from .db import db, environment, SCHEMA, add_prefix_for_prod

notes_tags = db.Table(
    "notes_tags",
    db.Model.metadata,
    db.Column("note_id", db.Integer, db.ForeignKey(add_prefix_for_prod("notes.id"))),
    db.Column("tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")))
)

if environment == "production":
    notes_tags.schema = SCHEMA