from flask import Blueprint, jsonify
from app.models import Album, Song

album_routes = Blueprint('albums', __name__)

##get all albums
@album_routes.route('/')
def albums():
    albums = Album.query.all()
    #print('getallalbums', albums)
    return {"albums":[album.to_dict() for album in albums]}
    

##get single album by id
@album_routes.route('/<int:album_id>')
def get_one_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return {"errors":"album not found"}, 404
    return  album.to_dict()


@album_routes.route("/<int:album_id>/songs")
def one_album_songs(album_id):
    # album = Album.query.join(Song).filter(Song.album_id == album_id)
    album = Album.query.get(album_id).to_dict()
    songs = Song.query.filter(Song.album_id == album_id).all()
    album['songs'] = [song.to_dict() for song in songs]
    return album






