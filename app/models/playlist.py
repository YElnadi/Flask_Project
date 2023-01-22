from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

playlist_songs = db.Table(
    'playlist_songs',
    db.Model.metadata,
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")),primary_key=True)
)

if environment == "production":
    playlist_songs.schema = SCHEMA



class Playlist(db.Model):
    __tablename__='playlists'

    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    playlist_img_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now()) 



##one to many relationship every user can create many playlists
    user = db.relationship("User", back_populates='playlist')
    # user_playlists = db.relationship("User", back_populates="playlist_users")
    songs = db.relationship(
        "Song",
        secondary=playlist_songs,
        back_populates="playlists"
    )

    def to_dict(self):
        playlist = {
            'id':self.id,
            'title':self.title,
            'user_id':self.user_id, 
            'description':self.description,
            'playlist_img_url':self.playlist_img_url,
            'user':self.user.username,
            'songs':[song.to_dict() for song in self.songs]
        }
  
    
        # if user:
        #     playlist["user"] = self.user.to_dict()

        # if image:
        #     playlist["image"] = self.playlist_img_url

        return playlist 
