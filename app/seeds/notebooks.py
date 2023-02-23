from app.models import db, User, Note, Notebook, environment, SCHEMA

def seed_notebooks():
  demo = User.query.get(1)
  marnie = User.query.get(2)
  bobbie = User.query.get(3)

  note1 = Note.query.get(1)
  note2 = Note.query.get(2)
  note3 = Note.query.get(3)
  note4 = Note.query.get(4)

  notebook1 = Notebook(
    user=demo,
    title="First Notebook",
    created_at="2023-02-23",
    updated_at="2023-02-23"
  )

  notebook1.notes.append(note1)

  notebook2 = Notebook(
    user=demo,
    title="Reminders",
    created_at="2023-02-23",
    updated_at="2023-02-23"
  )

  notebook2.notes.append(note2)

  notebook3 = Notebook(
    user=marnie,
    title="Reading Notes",
    created_at="2023-02-23",
    updated_at="2023-02-23"
  )

  notebook3.notes.append(note3)

  notebook4 = Notebook(
    user=bobbie,
    title="Reading Notes",
    created_at="2023-02-23",
    updated_at="2023-02-23"
  )

  notebook4.notes.append(note4)
  db.session.add_all([notebook1, notebook2, notebook3, notebook4])
  db.session.commit()


def undo_notebooks():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM notebooks")

  db.session.commit()