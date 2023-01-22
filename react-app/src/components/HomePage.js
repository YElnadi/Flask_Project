import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { loadAlbumsThunk } from "../store/albums";
import { loadPlaylistThunk, loadMyPlaylistsThunk } from "../store/playlists";
import SpotCards from "./SpotCards";
import SinglePlaylistCard from "./SinglePlaylistCard";
import PlaylistCard from "./PlaylistCard";
import "./HomePage.css";
import CreateAlbum from "./CreateAlbum";
import CreatePlaylist from "./CreatePlaylist";

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
      {/*------------ below navbar left column: NavLinks to createPlaylist & createAlbum --------------*/}
      <div className="homepage-below-nav">
        {/*----------- navigation top left: home, search, createAlbum, createPlaylist ------------ */}

        <div className="side-nav-bar" style={{ marginLeft: 5 }}>
          <p>
            <NavLink to="/" exact={true} activeClassName="active">
              <i
                class="fa-solid fa-house"
                style={{ color: "#b3b3b3", margin: "0px 10px" }}
              ></i>
              Home
            </NavLink>
          </p>

          <p>
            <NavLink to="/search" exact={true} activeClassName="active">
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ color: "#b3b3b3", margin: "0px 10px" }}
              ></i>
              Search
            </NavLink>
          </p>

          <p>{user && <CreatePlaylist />}</p>
          <p>{user && <CreateAlbum />}</p>
        </div>

        {/*-------------- below navbar right column: renders playlists & albums ----------------*/}

        {/* -------- album --------*/}
        <div>
          <div>
            <h1 className="feature-title">Spoti8 Albums</h1>
            <div className="feature-card">
              {Object.values(allAlbums).map((album) => (
                <SpotCards
                  key={album.id}
                  title={album.title}
                  maker={album.artist}
                  image_url={album.album_img_url}
                  id={album.id}
                />
              ))}
            </div>
          </div>
          <hr />

          {/* -------- playlist --------*/}
          <div>
            <h1 className="feature-title">Spoti8 Playlist</h1>
            <div className="feature-card" style={{ paddingBottom: 80 }}>
              {Object.values(allPlaylists).map((playlist) => (
                <SinglePlaylistCard playlist={playlist} key={playlist.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
