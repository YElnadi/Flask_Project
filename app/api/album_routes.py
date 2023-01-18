from flask import Blueprint, jsonify
from app.models import Album, Song

album_routes = Blueprint('albums', __name__)

@album_routes.route('/')
def albums():
    albums = Album.query.all()
    return {
        'albums': [album.to_dict() for album in albums]
    }

@album_routes.route('/<int:album_id>')
def get_one_album(album_id):
    album = Album.query.get(album_id)
    return {
        'single-album': album.to_dict()
    }



@album_routes.route("/<int:album_id>/songs")
def one_album_songs(album_id):
    # album = Album.query.join(Song).filter(Song.album_id == album_id)
    album = Album.query.get(album_id).to_dict()
    songs = Song.query.filter(Song.album_id == album_id).all()
    album['songs'] = [song.to_dict() for song in songs]
    return album
  