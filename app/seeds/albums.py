from app.models import db, environment, SCHEMA, Album

def seed_albums():
    demo_album = Album(
       artist ='Demo',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN'
    )

    db.session.add(demo_album)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")
        
    db.session.commit()

