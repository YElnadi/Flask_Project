from app.models import db, environment, SCHEMA, Song

def seed_songs():
    demo_song1 = Song(
        title = 'Peaceful Piano1',
        album_id = 1,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/3c11c9105e734eaf906a4dac2fc52b16.mp3' 

    )
    demo_song2 = Song(
        title = 'Peaceful Piano2',
        album_id = 2,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/fingerstyle-guitar-cover.mp3' 

    )
    demo_song3 = Song(
        title = 'Peaceful Piano3',
        album_id = 3,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/you-proof-official-music-video.mp3' 

    )
    demo_song4 = Song(
        title = 'Peaceful Piano4',
        album_id = 4,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/payphone-fingerstyle-guitar-cover-by-james-bartholomew.mp3' 

    )
    demo_song5 = Song(
        title = 'Peaceful Piano5',
        album_id = 5,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/jhoom-x-kesariya-acv-mashup-brahmastra-ranbir-kapoor-alia-bhatt-arijit-singh-ali-zafar.mp3' 

    )

    db.session.add(demo_song1)
    db.session.add(demo_song2)
    db.session.add(demo_song3)
    db.session.add(demo_song4)
    db.session.add(demo_song5)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")
        
    db.session.commit()