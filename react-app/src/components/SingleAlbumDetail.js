import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getOneAlbumThunk} from '../store/albums'


const SingleAlbumDetail = () => {
  const {albumId} = useParams()
  console.log("$$$$$$$albumId:",albumId)
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector(state=>state.albums.singleAlbum)

  const getSongs = (album) => {
    const songs = album.songs !== undefined ? album.songs : []
    return Object.values(songs)
  }

  console.log("$$$$$$album:", album)


  useEffect(async()=>{
    await dispatch(getOneAlbumThunk(albumId))
  },[dispatch, albumId])
  
  return (
    <>
    <h1>You are in the album</h1>
    <div>
      <img src={album.album_img_url} style={{ width: 200, height: 200 }}/>
    </div>
    <div>
      <p>{album.title}</p>
    </div>
    <div>
      {getSongs(album).length}
      
    </div>
    <div style={{whiteSpace:'pre-line'}}>
      {getSongs(album).map(song=>song.title).join("\n")}
    </div>
    </>
  );
};

export default SingleAlbumDetail;
