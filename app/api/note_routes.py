from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Note, Notebook
from app.forms import NoteForm
from .auth_routes import validation_errors_to_error_messages
from app.models import db


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

@note_routes.route("/<int:note_id>", methods=["DELETE"])
@login_required
def delete_note(note_id):
  note = Note.query.get(note_id)

  if note is None:
    return {"errors": f"There is no note with an id of {note_id}"}

  db.session.delete(note)
  db.session.commit()
  return {"success": True, "status_code": 200}