from app.models import db, Tag, Note, environment, SCHEMA

def seed_notes_tags():
    tag1 = db.session.query(Tag).get(1)
    tag2 = db.session.query(Tag).get(2)
    tag3 = db.session.query(Tag).get(3)
    tag4 = db.session.query(Tag).get(4)

    note1 = db.session.query(Note).get(1)
    note2 = db.session.query(Note).get(2)

    tag1.notes.append(note1)
    tag2.notes.append(note2)
    tag3.notes.append(note1)
    tag4.notes.append(note2)

    note1.tags.append(tag1)
    note1.tags.append(tag3)
    note2.tags.append(tag2)
    note2.tags.append(tag4)

    db.session.commit()


def undo_notes_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes_tags")