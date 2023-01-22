from app.models import db, environment, SCHEMA, Playlist

def seed_playlists(songs):
    demo_playlist = Playlist(
        user_id = 2,
        title = 'Cocktail Mix',
        description ='Mix to play when I have friends over for drinks',
        playlist_img_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDwrTFlDweKWP1IGcdo823alGdSUs84I5OQ&usqp=CAU',
        #songs = [1,2,3]    # David: use song parameter up there 
        songs = songs 
        
    )

    db.session.add(demo_playlist)
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM playlists")
        
    db.session.commit()