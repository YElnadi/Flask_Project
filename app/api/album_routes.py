from flask import Blueprint, jsonify
from app.models import Album

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
