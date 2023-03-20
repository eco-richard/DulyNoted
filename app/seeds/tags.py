from app.models import db, User, Tag, Note, environment, SCHEMA

# Add seed data for tags
def seed_tags():
    demo = User.query.get(1)

    note1, note2 = demo.notes

    tag1 = Tag(
        title="shopping",
        color=2463422
    )

    tag2 = Tag(
        title="reminders",
        color=15382134
    )

    tag3 = Tag(
        title="urgent",
        color=10631463
    )

    db.session.add_all([tag1, tag2, tag3])

    note1.tags.append(tag1)
    note2.tags.append(tag2, tag3)
    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
