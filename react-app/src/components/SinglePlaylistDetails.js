import { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlaylistThunk, deletePlaylistThunk } from "../store/playlists";
import PlayThisButton from "./PlayThisButton";
// import EditPlaylistModal from "./EditPlayListModal";
// import EditPlaylistForm from "./EditPlaylistForm";
import CreateAlbum from "./CreateAlbum";
import CreatePlaylist from "./CreatePlaylist";
import "./HomePage.css";

const SinglePlaylistDetails = () => {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const playlist = useSelector((state) => state.playlists.singlePlaylist);

  const getSongs = (playlist) => {
    const songs = playlist.songs !== undefined ? playlist.songs : [];
    return Object.values(songs);
  };

  const deletePlaylist = (e) => {
    e.preventDefault();
    return dispatch(deletePlaylistThunk(playlistId)).then(history.push("/"));
  };

  useEffect(() => {
    dispatch(getOnePlaylistThunk(playlistId));
  }, [dispatch, playlistId]);

  return (
    <>
      {/* <p>Your are in playlist</p> */}
      {/* <button className="edit-playlist" onClick={submit}>Edit Playlist</button> */}
      {/* <div>
        <img
          src={playlist.playlist_img_url}
          style={{ width: 200, height: 200 }}
        />
      </div> */}
      <div className='homepage-below-nav'>
        <div className="detail-page" >
          <div className="side-nav-bar">
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

          <div className="playlist-page-detail">
            <h1>Your are in playlist</h1>
            {/* <button className="edit-playlist" onClick={submit}>Edit Playlist</button> */}
            <div>
              {/* <EditPlaylistForm /> */}
              <img
                src={playlist.playlist_img_url}
                style={{ width: 200, height: 200 }}
              />
            </div>

            <div>
              {user && playlist && user.id === playlist.user_id && (
                <button  className="demo-btn" style={{color:'whitesmoke'}} onClick={deletePlaylist}>
                  Delete
                </button>
              )}
            </div>

            <div>
              <PlayThisButton id={playlist.id} isPlaylist={true} />

              {/* <button style={{ width: 50 }} onClick={deletePlaylist}>
          delete
        </button> */}

              <div>
                <p>{playlist.title}</p>
              </div>
              <div>
                <p>{playlist.description}</p>
              </div>
              <div>
                <p>{getSongs(playlist).length} songs</p>
              </div>
              <div style={{ whiteSpace: "pre-line" }}>
                {getSongs(playlist)
                  .map((song) => song.title)
                  .join("\n")}
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: 50 }}></div>
      </div>
    </>
  );
};

export default SinglePlaylistDetails;
