from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  artist = StringField('Artist')
  album_img_url = TextField('Album Image URL')
  submit = SubmitField('Submit')
