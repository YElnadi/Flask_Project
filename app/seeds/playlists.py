from app.models import db, environment, SCHEMA, Playlist

def seed_playlists():
    demo_playlist = Playlist(
        user_id = 1,
        title = 'Peaceful Piano',
        description ='Relax and indulge with beautiful piano pieces',
        playlist_img_url = 'https://pyxis.nymag.com/v1/imgs/302/f53/44d6479a2489d3b5719ef9b7e44bb6b14c-piano-buying-guide.2x.rsocial.w600.jpg',
        #songs = [1,2,3]
        

    )

    db.session.add(demo_playlist)
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")
        
    db.session.commit()