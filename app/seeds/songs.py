from app.models import db, environment, SCHEMA, Song

def seed_songs():
    demo_song1_1 = Song(
        title = 'That\'s Amore',
        album_id = 1,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/a9e82125208a4a6ba88f486ea4e255e4.mp3'
    )
    demo_song1_2 = Song(
        title = 'Sway (Quien Sera)',
        album_id = 1,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/b1c1aa4b4c59455b8dd07a53a227b0f7.mp3'
    )
    demo_song1_3 = Song(
        title = 'Everybody Loves Somebody',
        album_id = 1,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/5bab9e614daf447189f2db239cdcf0f7.mp3'
    )
    demo_song2_2 = Song(
        title = 'Can I Kick It?',
        album_id = 2,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/e7ea96a393fe4d85b01026f87a9db11d.mp3'

    )
    demo_song2_3 = Song(
        title = 'Luck of Lucien',
        album_id = 2,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/e02752b5e6fa4a1795b19cab13ea5029.mp3'

    )
    demo_song3_1 = Song(
        title = 'Send My Love (To Your New Lover)',
        album_id = 3,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/196d91b4ed8244c79bcf709501f383f4.mp3'
    )
    demo_song3_2 = Song(
        title = 'Million Years Ago',
        album_id = 3,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/60717f695c4c4eba8a740256bfec734c.mp3'
    )
    demo_song3_3 = Song(
        title = 'Set Fire To The Rain',
        album_id = 3,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/c20f4543493f42c7860e5b88e3f1978a.mp3'
    )
    demo_song4_1 = Song(
        title = 'Little Wing',
        album_id = 4,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3'
    )
    demo_song4_2 = Song(
        title = 'Castles Made of Sand',
        album_id = 4,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3'
    )
    demo_song4_3 = Song(
        title = 'Bold as Love',
        album_id = 4,
        song_url = 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3'
    )
    demo_song5_1 = Song(
        title = 'Kol Haga',
        album_id = 5,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/1f8bd34d9484486ebfb00b5be04fc2e7.mp3'
    )
    demo_song5_2 = Song(
        title = 'Ana Negm',
        album_id = 5,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/141ea88006c84c5ea2ff259f5d4ed158.mp3'
    )
    demo_song5_3 = Song(
        title = 'Samurai',
        album_id = 5,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/141ea88006c84c5ea2ff259f5d4ed158.mp3'
    )
    demo_song6_1 = Song(
        title = 'The Audacity',
        album_id = 6,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/f29845eab4044325a5b6c385f64c6d74.mp3'
    )
    demo_song6_2 = Song(
        title = 'Genesis',
        album_id = 6,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/32d2b4be2e1b49cdaa15ee4cdc4d3cf9.mp3'
    ) 
    demo_song6_3 = Song(
        title = 'Playing God',
        album_id = 6,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/4dad9b32291d4eb1984abf6d0f5d095d.mp3'
    )
    demo_song7_1 = Song(
        title = 'Humraah',
        album_id = 7,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/ab8151f7e86043f78bdba4410e5075c4.mp3'
    )
    demo_song7_2 = Song(
        title = 'Malang',
        album_id = 7,
        song_url = 'https://spotify8bucket.s3.amazonaws.com/4217a2f8e33e4e12a240c9ebde3865de.mp3'
    )
   


    db.session.add(demo_song1_1)
    db.session.add(demo_song1_2)
    db.session.add(demo_song1_3)
    db.session.add(demo_song2_2)
    db.session.add(demo_song2_3)
    db.session.add(demo_song3_1)
    db.session.add(demo_song3_2)
    db.session.add(demo_song3_3)
    db.session.add(demo_song4_1)
    db.session.add(demo_song4_2)
    db.session.add(demo_song4_3)
    db.session.add(demo_song5_1)
    db.session.add(demo_song5_2)
    db.session.add(demo_song5_3)
    db.session.add(demo_song6_1)
    db.session.add(demo_song6_2)
    db.session.add(demo_song6_3)
    db.session.add(demo_song7_1)
    db.session.add(demo_song7_2)
    db.session.commit()
    songs = [demo_song1_1, demo_song1_2, demo_song1_3, demo_song2_2, demo_song2_3, demo_song3_1, demo_song3_2, demo_song3_3, demo_song4_1, demo_song4_2, demo_song4_3, demo_song5_1, demo_song5_2,demo_song5_3, demo_song6_1, demo_song6_2, demo_song6_3, demo_song7_1,demo_song7_2]
    return songs

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM songs")

    db.session.commit()
