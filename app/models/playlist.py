from .db import db, environment, SCHEMA, add_prefix_for_prod


class Playlist(db.Model):
    __tablename__='playlists'

    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    playlist_img_url = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False) 



##one to many relationship every user can create many playlists
    user = db.relationship("User", back_populates='playlist')

    def to_dict(self):
        return {
            'id':self.id,
            'title':self.title,
            'description':self.description,
            'image_url':self.image_url,
            'user':self.user.to_dict() ## need to check 
        }