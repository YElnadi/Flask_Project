from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist_song(db.Model):
    __tablename__='playlist_songs'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("playlists.id")))
    song_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("songs.id")))

    ##relationships
    song = db.relationship('Song',back_populates='playlist_song')

    playlist = db.relationship('Playlist', back_populates='playlist_song')



