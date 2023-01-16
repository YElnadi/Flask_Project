import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loadAlbumsThunk } from "../store/albums";


const HomePage = () => {
  const dispatch = useDispatch();
  const allAlbums = useSelector(state => state.albums.allAlbums);
  console.log(allAlbums, '==========');

  useEffect(() => {
    dispatch(loadAlbumsThunk());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>SPOTIFY CLONE</h1>
        {Object.values(allAlbums).map(album => (
          <div key={album}>
            <p>{album.title}</p>
            <img src={album.album_img_url} alt={album.title}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage
