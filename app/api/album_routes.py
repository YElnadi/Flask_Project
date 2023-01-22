from flask import Blueprint, jsonify, request
from app.models import db, Album, Song
from flask_login import login_required, current_user
from ..forms.album_form import AlbumForm

album_routes = Blueprint('albums', __name__)

##get all albums
@album_routes.route('/')
def albums():
    albums = Album.query.all()
    #print('getallalbums', albums)
    return {"albums":[album.to_dict() for album in albums]}


##get single album by id
@album_routes.route('/<int:album_id>', methods=["GET"])
def get_one_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return {"errors":"album not found"}, 404
    return  album.to_dict()


# @album_routes.route("/<int:album_id>/songs")
# def one_album_songs(album_id):
#     # album = Album.query.join(Song).filter(Song.album_id == album_id)
#     album = Album.query.get(album_id).to_dict()
#     songs = Song.query.filter(Song.album_id == album_id).all()
#     album['songs'] = [song.to_dict() for song in songs]
#     return album



# create a new album
@album_routes.route('/', methods=['POST'])
@login_required
def new_album():

    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form.data["user_id"] = user_id
    if form.validate_on_submit():
      new_album = Album()
      form.populate_obj(new_album)
      new_album.album_img_url = form.data['album_img_url'] if form.data['album_img_url'] else '/static/images/unknown-album-cover.jpeg'

      db.session.add(new_album)
      db.session.commit()
      return new_album.to_dict()
    else:
      return form.errors


##Delete Album
@album_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    if album:
        db.session.delete(album)
        db.session.commit()
        return {"message":"Album has been deleted successfully"}
    else:
        return {"message": f"No album found with id of {id}"}
