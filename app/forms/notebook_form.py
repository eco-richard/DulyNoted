from flask_wtf import FlaskForm
import wtforms as wtf
from wtforms.validators import DataRequired

class NotebookForm(FlaskForm):
  title = wtf.StringField("title", validators=[DataRequired()])
  created_at = wtf.StringField("created_at")
  updated_at = wtf.StringField("updated_at")