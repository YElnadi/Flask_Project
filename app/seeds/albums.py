from app.models import db, environment, SCHEMA, Album

def seed_albums():
    demo_album1 = Album(
       artist ='Demo1',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN1'
    )
    demo_album2 = Album(
       artist ='Demo2',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN2'
    )
    demo_album3 = Album(
       artist ='Demo3',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN3'
    )
    demo_album4 = Album(
       artist ='Demo4',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN4'
    )
    demo_album5 = Album(
       artist ='Demo5',
       album_img_url = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
       title = 'PAIN5'
    )



    
    db.session.add(demo_album1)
    db.session.add(demo_album2)
    db.session.add(demo_album3)
    db.session.add(demo_album4)
    db.session.add(demo_album5)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")
        
    db.session.commit()

