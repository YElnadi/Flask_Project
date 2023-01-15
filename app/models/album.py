from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__='albums'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    year = db.Column(db.Integer)
    album_image = db.Column(db.Text)
    ##artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(artists.id)))


    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'year':self.year,
            'artist':self.artist ## check this 
        }