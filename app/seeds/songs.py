from app.models import db, environment, SCHEMA, Song

def seed_songs():
    demo_song = Song(
        title = 'Peaceful Piano',
        album_id = 1,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/3c11c9105e734eaf906a4dac2fc52b16.mp3' 

    )

    db.session.add(demo_song)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")
        
    db.session.commit()