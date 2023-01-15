from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__='albums'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    album_image_url = db.Column(db.Text)
    artist = db.Column(db.String(255))
    ##artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(artists.id)))


    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'year':self.year,
            'artist':self.artist ## check this 
        }