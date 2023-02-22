from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Note, Notebook
from .auth_routes import validation_errors_to_error_messages

notebook_routes = Blueprint("notebooks", __name__)