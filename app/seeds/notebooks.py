from app.models import db, User, Note, Notebook, environment, SCHEMA

def seed_notebooks():
  demo = User.query.get(1)
  marnie = User.query.get(2)
  bobbie = User.query.get(3)

  notes = Note.query.all()


def undo_notebooks():
  pass