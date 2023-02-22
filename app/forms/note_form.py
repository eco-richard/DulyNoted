from flask_wtf import FlaskForm
import wtforms as wtf
from wtforms.validators import DataRequired
from app.models import Note

class NoteForm(FlaskForm):
  title = wtf.StringField("title", validators=[DataRequired()]),
  notebook_id = wtf.StringField("notebook_id")
  body = wtf.TextAreaField("body", validators=[DataRequired()]),
  created_at = wtf.StringField("created_at", validators=[DataRequired()])
  updated_at = wtf.StringField("updated_at", validators=[DataRequired()])
