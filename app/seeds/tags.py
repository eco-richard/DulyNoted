from app.models import db, User, Tag, Note, environment, SCHEMA

# Add seed data for tags
def seed_tags():
    demo = User.query.get(1)

    tag1 = Tag(
        user=demo,
        title="shopping",
        color="#2596BE"
    )

    tag2 = Tag(
        user=demo,
        title="reminders",
        color="#EAB676"
    )

    tag3 = Tag(
        user=demo,
        title="urgent",
        color="#A23927"
    )

    tag4 = Tag(
        user=demo,
        title="other tags",
        color="#ABDBE3"
    )

    db.session.add_all([tag1, tag2, tag3, tag4])
    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
