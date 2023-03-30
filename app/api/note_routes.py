from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Note, Notebook, Tag
from app.forms import NoteForm
from .auth_routes import validation_errors_to_error_messages
from app.models import db
import sys


note_routes = Blueprint("notes", __name__)

@note_routes.route("")
@login_required
def get_all_user_notes():
  """
  Query for all the notes of the current user
  """
  return {"Notes": [note.to_dict() for note in current_user.notes]}

@note_routes.route("/<int:note_id>")
@login_required
def get_single_note(note_id):
  """
  Query for a single note and include the body of the note
  """
  note = Note.query.get(note_id)
  return note.single_note()

@note_routes.route("<int:note_id>/tags")
@login_required
def get_notes_with_tag(note_id):
  """
  Return the tags accociated with a note
  """
  note = Note.query.get(note_id)
  return {"Tags": [tag.to_dict() for tag in note.tags]}


@note_routes.route("", methods=["POST"])
@login_required
def create_note():
  """
  Create a new note
  """
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  default_notebook = db.session.query(User.notebooks).filter_by(id=current_user.id).order_by(Notebook.id).first()
  if form.validate_on_submit():
    note = Note(
      user=current_user,
      title=data["title"],
      body=data["body"],
      created_at=data["created_at"],
      updated_at=data["updated_at"],
    )
    db.session.add(note)
    db.session.commit()
    return note.single_note()
  return { "errors": validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route("/<int:note_id>", methods=["PUT"])
@login_required
def update_note(note_id):
  """
  Update an existing note
  """
  note = Note.query.get_or_404(note_id)
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  data = form.data
  if form.validate_on_submit():
    note.title = data["title"]
    note.body = data["body"]
    note.notebook_id = data["notebook_id"]
    note.updated_at = data["updated_at"]
    db.session.commit()
    return note.single_note()
  return { "errors": validation_errors_to_error_messages(form.errors)}, 401


@note_routes.route("/<int:note_id>/tags", methods=["POST"])
@login_required
def add_tags_to_note(note_id):

  pass

@note_routes.route("/<int:note_id>/tags/<int:tag_id>", methods=["PUT"])
# @login_required
def add_tag_to_note(note_id, tag_id):
  note = Note.query.get(note_id)
  tag = Tag.query.get(tag_id)

  if tag not in note.tags:
    note.tags.append(tag)
  if note not in tag.notes:
    tag.notes.append(note)

  db.session.commit()
  return note.to_dict();

@note_routes.route("/<int:note_id>/tags/<int:tag_id>", methods=["DELETE"])
# @login_required
def remove_tag_from_note(note_id, tag_id):
  log_file = open("delete-log.txt", 'a')
  note = Note.query.get(note_id)
  tag = Tag.query.get(tag_id)
  for loop_tag in note.tags:
    if tag == loop_tag:
      log_file.write(f"FOUND TAG: {loop_tag.to_dict()}\n")
    log_file.write(f"NOTE TAG: {loop_tag.to_dict()}\n")

  for loop_note in tag.notes:
    if note == loop_note:
      log_file.write(F"FOUND NOTE: {loop_note.to_dict()}\n")
    else:
      log_file.write(f"TAG NOTE: {loop_note.to_dict()}\n")


  if tag in note.tags:
    log_file.write(f"IN TAG IN NOTES.TAG\n")
    note.tags.remove(tag)
    log_file.write(f"AFTER REMOVE")
  if note in tag.notes:
    log_file.write(f"IN NOTE IN TAG.NOTES\n")
    tag.notes.remove(note)
    log_file.write(f"AFTER REMOVE")

  db.session.commit()
  return note.to_dict()
  log_file.close()


@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def delete_note(note_id):
  note = Note.query.get(note_id)

  if note is None:
    return {"errors": f"There is no note with an id of {note_id}"}

  db.session.delete(note)
  db.session.commit()
  return {"success": True, "status_code": 200}