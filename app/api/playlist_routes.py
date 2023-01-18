from flask import Blueprint, jsonify, request, render_template
from app.models import Playlist, db
from flask_login import login_required, current_user
from ..forms.playlist_form import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)


##get all playlists
@playlist_routes.route('/')
def playlists():
    playlists = Playlist.query.all()
    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }

##get one playlist by id
@playlist_routes.route('/<int:playlist_id>')
def get_one_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
      return {"errors": "playlist not found"}, 404
    return playlist.to_dict()
    


@playlist_routes.route('/form', methods=['GET', 'POST'])
# @login_required
def new_playlist(): 

    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form.data["user_id"] = user_id

    if form.validate_on_submit(): 
      new_playlist = Playlist(
        title=form.data['title'], 
        user_id=form.data['user_id'],
        description=form.data['description'],
        playlist_img_url=form.data['playlist_img_url']
      )
      db.session.add(new_playlist)
      db.session.commit()
    #   return new_playlist.to_dict()
    # else: 
    #   return form.errors 
    return render_template('playlist_form.html', form=form)




@playlist_routes.route('/<int:playlist_id>/edit', methods=['GET', 'PUT'])
# @login_required
def update_playlist(playlist_id):

  playlist = Playlist.query.get(playlist_id)
  form = PlaylistForm(obj=playlist)
  # form.populate_obj(playlist)   # populate form, and see it 
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit(): 
    playlist.title = form.data['title']
    playlist.description = form.data['description']
    playlist.playlist_img_url = form.data['playlist_img_url']
    db.session.commit()
    return playlist.to_dict()
  # else: 
  #   return form.errors

  return render_template('playlist_form.html', form=form)



    
    
