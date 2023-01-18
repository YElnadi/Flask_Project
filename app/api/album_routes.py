from flask import Blueprint, jsonify
from app.models import Album

album_routes = Blueprint('albums', __name__)

@album_routes.route('/')
def albums():
    albums = Album.query.all()
    return [album.to_dict() for album in albums]
    

##get single album by id
@album_routes.route('/<int:album_id>')
def get_one_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return {"errors":"album not found"}, 404
    return  album.to_dict()
    
