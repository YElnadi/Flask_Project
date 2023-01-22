import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAlbumsThunk } from "../store/albums";
import { loadPlaylistThunk, loadMyPlaylistsThunk } from "../store/playlists";
import SpotCards from "./SpotCards";
import SinglePlaylistCard from "./SinglePlaylistCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const allAlbums = useSelector((state) => state.albums.allAlbums);
  const user = useSelector((state) => state.session.user);
  // console.log('#####allAlbums:', allAlbums)
  const allPlaylists = useSelector((state) => state.playlists.allPlaylists);

  useEffect(() => {
    dispatch(loadAlbumsThunk());
    dispatch(loadPlaylistThunk());
    if (user) {
      dispatch(loadMyPlaylistsThunk(user.id));
    }
  }, [dispatch, user]);
  // useEffect(() => {
  // }, [dispatch, user]);
  return (
    <>
      <div>
        <h1>Spotify8 Albums</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 200px)",
            gridGap: "1rem",
            padding: "0 20px 0 20px",
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
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
        </div>

        <h1>Spotify8 Playlist</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 200px)",
            gridGap: "1rem",
            padding: "0 20px 0 20px",
            backgroundColor: "black",
            justifyContent: "center",
          }}
        >
          {Object.values(allPlaylists).map((playlist) => (
            <SinglePlaylistCard
              playlist={playlist}
              key={playlist.id}
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
      </div>
    </>
  );
};

export default HomePage;
