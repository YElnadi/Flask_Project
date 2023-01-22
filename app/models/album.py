from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__='albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    album_img_url = db.Column(db.Text)
    artist = db.Column(db.String(255))
    owner_id = db.Column(db.Integer, nullable=True)
    

    ##relationship
    songs = db.relationship('Song',back_populates='album', cascade = 'all, delete' )


    def to_dict(self):
        album = {
            'id':self.id,
            'title':self.title,
            'album_img_url':self.album_img_url,
            'artist':self.artist,
            'owner_id':self.owner_id,
            'songs':[song.to_dict() for song in self.songs]
        }
        return album 