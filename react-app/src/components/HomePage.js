import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loadAlbumsThunk } from "../store/albums";
import { loadPlaylistThunk } from "../store/playlists";
import SpotCards from "./SpotCards";
import SinglePlaylistCard from "./SinglePlaylistCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const allAlbums = useSelector((state) => state.albums.allAlbums);
  console.log('#####allAlbums:', allAlbums)
  const allPlaylists = useSelector((state) => state.playlists.allPlaylists);

  useEffect(async () => {
    await dispatch(loadAlbumsThunk());
    await dispatch(loadPlaylistThunk());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Spotify Albums</h1>
        {Object.values(allAlbums).map((album) => (
          <SpotCards
            key={album.id}
            title={album.title}
            maker={album.artist}
            image_url={album.album_img_url}
            id={album.id}
          />
          // <div key={album}>
          //   <p>{album.title}</p>
          //   <img src={album.album_img_url} alt={album.title}/>
          // </div>
        ))}

        <h1>Spotify Playlist</h1>

        {Object.values(allPlaylists).map((playlist) => (
          <SinglePlaylistCard playlist={playlist} key={playlist.id}
            // key={playlist.id}
            // title={playlist.title}
            // description={playlist.description}
            // maker={playlist.user}
            // image_url={playlist.playlist_img_url}
            // id={playlist.id}
          />
          // <div key={album}>
          //   <p>{album.title}</p>
          //   <img src={album.album_img_url} alt={album.title}/>
          // </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
