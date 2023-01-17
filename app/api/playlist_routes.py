from flask import Blueprint, jsonify
from app.models import Playlist, db
from flask_login import login_required, current_user

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
def playlists():
    playlists = Playlist.query.all()
    return {
        'playlists': [playlist.to_dict() for playlist in playlists]
    }

@playlist_routes.route('/<int:playlist_id>')
def get_one_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    return {
        'single-playlist': playlist.to_dict()
    }

# @playlist_routes.route('/', methods=['POST'])
# @login_required
# def new_playlist():
#     playlists = Playlist.query.filter(user_id=current_user.id).all()
#     print(playlists)
#     new_playlist = Playlist(
#         title=f'My playlist #{len(playlists.playlists) + 1}',
#         user_id=current_user.id,
#         description='',
#         playlist_img='https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg',
#     )
#     # db.session.add(new_playlist)
#     # db.session.commit()
#     return new_playlist.to_dict()
