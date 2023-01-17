from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField, SubmitField
from wtforms.validators import DataRequired
from app.models import Playlist

class PlaylistForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  user_id = IntegerField('User ID', validators=[DataRequired()])
  description = TextField('Description', validators=[DataRequired()])
  playlist_img_url = TextField('Playlist Image URL', validators=[DataRequired()])
  submit = SubmitField('Save')