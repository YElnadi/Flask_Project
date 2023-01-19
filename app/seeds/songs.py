from app.models import db, environment, SCHEMA, Song

def seed_songs():
    demo_song1 = Song(
        title = 'Peaceful Piano1',
        album_id = 1,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3' 

    )
    demo_song2 = Song(
        title = 'Peaceful Piano2',
        album_id = 2,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' 

    )
    demo_song3 = Song(
        title = 'Peaceful Piano3',
        album_id = 3,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' 

    )
    demo_song4 = Song(
        title = 'Peaceful Piano4',
        album_id = 4,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' 

    )
    demo_song5 = Song(
        title = 'Peaceful Piano5',
        album_id = 5,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3' 

    )


    db.session.add(demo_song1)
    db.session.add(demo_song2)
    db.session.add(demo_song3)
    db.session.add(demo_song4)
    db.session.add(demo_song5)
    db.session.commit()
    songs = [demo_song1, demo_song2, demo_song3, demo_song4, demo_song5]
    return songs 

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")
        
    db.session.commit()