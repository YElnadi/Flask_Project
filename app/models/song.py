from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    #user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    album_id = db.Column(db.String)
    song_url = db.Column(db.Text)
   
    

    ##relationship 
    album = db.relationship('Album', back_populates='songs')


    # user = db.relationship("User", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            #"username": self.user.id,
            "title":self.title,
            "album_id":self.album_id,
            "track_id":self.track_id

            
        }