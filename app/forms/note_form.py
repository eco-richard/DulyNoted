from flask_wtf import FlaskForm
import wtforms as wtf
from wtforms.validators import DataRequired
from app.models import Note

class NoteForm(FlaskForm):
  title = wtf.StringField("title")
  notebook_id = wtf.StringField("notebook_id")
  body = wtf.TextAreaField("body")
  created_at = wtf.StringField("created_at")
  updated_at = wtf.StringField("updated_at")
