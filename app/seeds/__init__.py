from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .tags import seed_tags, undo_tags
from .notes_tags import seed_notes_tags, undo_notes_tags
from .notebooks import seed_notebooks, undo_notebooks
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_notebooks()
        undo_notes_tags()
        undo_tags()
        undo_notes()
        undo_users()
    seed_users()
    seed_notes()
    seed_tags()
    seed_notes_tags()
    seed_notebooks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_notebooks()
    # undo_notes_tags()
    undo_tags()
    undo_notes()
    undo_users()
    # Add other undo functions here