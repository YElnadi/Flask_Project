from flask import Blueprint, jsonify
from app.models import Album  

album_routes = Blueprint('albums', __name__)

@album_routes.route('/')
def albums():
    albums = Album.query.all()
    return {
        'albums': [album.to_dict() for album in albums]
    }