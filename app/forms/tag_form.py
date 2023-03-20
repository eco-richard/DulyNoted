from flask_wtf import FlaskForm
import wtforms as wtf
from wtforms.validators import DataRequired
from app.models import Tag

class TagForm(FlaskForm):
    title = wtf.StringField("title")
    color = wtf.IntegerField("color")