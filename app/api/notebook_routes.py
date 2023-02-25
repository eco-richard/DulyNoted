from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Note, Notebook
from app.forms import NotebookForm
from .auth_routes import validation_errors_to_error_messages

notebook_routes = Blueprint("notebooks", __name__)

@notebook_routes.route("")
@login_required
def get_all_user_notebooks():
  """
  Query for all of the current user's notebooks
  """
  return {"Notebooks": [notebook.to_dict() for notebook in current_user.notebooks]}


@notebook_routes.route("/<int:notebook_id>")
@login_required
def get_single_notebook(notebook_id):
  """
  Return a notebook based on a specific id
  """
  notebook = Notebook.query.get(notebook_id)
  return notebook.to_dict()


@notebook.routes.route("/", methods=["POST"])
@login_required
def create_notebook():
  """
  Create a new notebook
  """
  form = NotebookForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    notebook = Notebook(
      user=current_user,
      title=data["title"],
      created_at=data["created_at"],
      updated_at=data["updated_at"]
    )
    db.session.add(notebook)
    db.session.commit()
    return notebook.to_dict()
  return { "errors": validation_errors_to_error_messages(form.errors)}, 401


@notebook_routes.route("/<int:notebook_id>", methods=["PUT"])
@login_required
def edit_notebook(notebook_id):
  """
  Edit a notebook
  """
  notebook = Notebook.query.get(notebook_id)

  if (notebook == None):
    return {"error": f"No notebook exists with id {notebook_id}"}, 404
  form = NotebookForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    notebook.title = data["title"]
    notebook.updated_at = data["updated_at"]
    db.session.commit()
    return notebook.to_dict()
  return { "errors": validation_errors_to_error_messages(form.errors)}, 401

