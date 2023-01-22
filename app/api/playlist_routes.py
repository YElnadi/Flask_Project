from flask import Blueprint, jsonify, request, render_template
from app.models import Song, Playlist, db
from flask_login import login_required, current_user
from ..forms.playlist_form import PlaylistForm

playlist_routes = Blueprint('playlists', __name__)


# get all playlists
@playlist_routes.route('/')
def playlists():
    playlists = Playlist.query.all()
    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }


# get one playlist by id


@playlist_routes.route('/<int:playlist_id>')
def get_one_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
      return {"errors": "playlist not found"}, 404
    return playlist.to_dict()

# Get all playlists by userId
@playlist_routes.route('/user/<int:id>')
@login_required
def get_my_playlists(id):
    playlists = Playlist.query.filter_by(user_id=id).all()
    if len(playlists):
        return {
            'playlists': [playlist.to_dict() for playlist in playlists]
        }
    else:
        return {'playlists': {}}


# create a new playlist
@playlist_routes.route('/', methods=['POST'])
# @login_required
def new_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form.data["user_id"] = user_id

    if form.validate_on_submit():
      new_playlist = Playlist()
      form.populate_obj(new_playlist)
      new_playlist.playlist_img_url = form.data['playlist_img_url'] if form.data['playlist_img_url'] else '/static/images/unknown-image-music.jpeg'

      # new_playlist = Playlist(
      #   title=form.data['title'],
      #   user_id=form.data['user_id'],
      #   description=form.data['description'],
      #   playlist_img_url=form.data['playlist_img_url']
      # )
      db.session.add(new_playlist)
      db.session.commit()
      return new_playlist.to_dict()
    else:
      return form.errors
    #return render_template('playlist_form.html', form=form)




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



# DELETE: playlist/:playlistId
@playlist_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return {"message":"Playlist has been deleted successfully"}
    else:
        return {"message": f"No playlist found with id of {id}"}


@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["POST"])
@login_required
def add_song_to_playlist(playlist_id, song_id):
    playlist = Playlist.query.get(playlist_id)
    song = Song.query.get(song_id)
    if playlist:
        if song:
          playlist.songs.append(song)
          db.session.commit()
          return playlist.to_dict()
        else:
          return {"error": f"No song with that {song_id}"}, 404
    else:
        return {"error": f"No playlist with that {playlist_id}"}, 404
