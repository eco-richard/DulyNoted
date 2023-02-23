from app.models import db, User, Note, environment, SCHEMA

# Add seed data for notes
def seed_notes():
  demo = User.query.get(1)
  marnie = User.query.get(2)
  bobbie = User.query.get(3)

  note1 = Note(
    user=demo,
    title="Shopping List",
    body="Eggs, Milk, Bread, Large Dagger with symbol of a rat",
    created_at='2023-02-22',
    updated_at='2023-02-22'
  )

  note2 = Note(
    user=demo,
    title="Reminders",
    body="1. Pick up kids, 2. Get dog out of the air vents",
    created_at='2023-02-22',
    updated_at='2023-02-22'
  )

  note3 = Note(
    user=marnie,
    title="Notes on Moby Dick",
    body="Love the cetalogy chapter",
    created_at='2023-02-22',
    updated_at='2023-02-22'
  )

  note4 = Note(
    user=bobbie,
    title="Notes on Moby Dick",
    body="Reread dubloon chapter",
    created_at='2023-02-22',
    updated_at='2023-02-22'
  )

  db.session.add_all([note1, note2, note3, note4])
  db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")

    db.session.commit()