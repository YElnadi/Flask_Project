from app.models import db, environment, SCHEMA, Album

def seed_albums():
    demo_album1 = Album(
       artist ='Dean Martin',
       album_img_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Dean_Martin%2C_Once_In_A_While.jpeg/220px-Dean_Martin%2C_Once_In_A_While.jpeg',
       title = 'Once In A While'
    )
    demo_album2 = Album(
       artist ='A Tribe Called Quest',
       album_img_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqoqpnR--NDmuH5yL80vVSMrY75PTCRWioQ&usqp=CAU',
       title = 'People\'s Instinctive Travels'
    )
    demo_album3 = Album(
       artist ='Adele',
       album_img_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2PrpFQGev0A3nzpkSRMGqODRU6iV_hXgng&usqp=CAU',
       title = 'Adele25'
    )
    demo_album4 = Album(
       artist ='Jimi Hendrix',
       album_img_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlDAXcCGt8wkQXV5_y2PX2tAp5AIj00Sbq2g&usqp=CAU',
       title = 'Axis: Bold as Love'
    )
    demo_album5 = Album(
       artist ='Cairokee',
       album_img_url = 'https://cdns-images.dzcdn.net/images/cover/d8f64e0a4a6f4e7602d5207e30af4f2d/264x264.jpg',
       title = 'Cairokee'
    )
    demo_album6 = Album(
       artist ='Polyphia',
       album_img_url = 'https://images.genius.com/c90b020b73f3efbaa7b151a37730a571.1000x1000x1.png',
       title = 'Remember You Will Die'
    )
    demo_album7 = Album(
       artist ='Sachet Tandon',
       album_img_url = 'https://pbs.twimg.com/profile_images/1135137634580279296/s6iPVjn0_400x400.jpg',
       title = 'Malang'
    )




    db.session.add(demo_album1)
    db.session.add(demo_album2)
    db.session.add(demo_album3)
    db.session.add(demo_album4)
    db.session.add(demo_album5)
    db.session.add(demo_album6)
    db.session.add(demo_album7)
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
