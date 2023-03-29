from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Note, Notebook, Tag
from app.forms import TagForm
from .auth_routes import validation_errors_to_error_messages
from app.models import db

tag_routes = Blueprint("tags", __name__)

@tag_routes.route("")
@login_required
def get_all_tags():
    """
    Query for all tags of the current user
    """
    return {"Tags": [tag.to_dict() for tag in current_user.tags]}

@tag_routes.route("/<int:tag_id>")
@login_required
def get_single_tag(tag_id):
    """
    Query for a single tag based on id
    """
    tag = Tag.query.get(tag_id)
    if (tag in current_user.tags):
        return tag.to_dict()
    return {"error": "Unauthorized"}

@tag_routes.route("", methods=["POST"])
@login_required
def create_tag():
    """
    Create a new tag
    """
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        tag = Tag(
            user=current_user,
            title=data["title"],
            color=data["color"]
        )
        db.session.add(tag)
        db.session.commit()
        return tag.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@tag_routes.route("/<int:tag_id>", methods=["PUT"])
@login_required
def update_tag(tag_id):
    """
    Update an existing tag
    """
    tag = Note.query.get_or_404(tag_id)
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    data = form.data
    if form.validate_on_submit():
        tag.title = data["title"]
        tag.color = data["color"]
        db.session.commit()
        return tag.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


@tag_routes.route("<int:tag_id>", methods=["DELETE"])
@login_required
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if tag is None:
        return {"error": f"There is no tag with id of {tag_id}"}

    db.session.delete(tag)
    db.session.commit()
    return {"success": True, "state_code": 200}

