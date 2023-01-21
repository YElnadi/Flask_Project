import { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlaylistThunk, deletePlaylistThunk } from "../store/playlists";
import PlayThisButton from './PlayThisButton';
// import EditPlaylistModal from "./EditPlayListModal";
// import EditPlaylistForm from "./EditPlaylistForm";

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
      <p>Your are in playlist</p>
      {/* <button className="edit-playlist" onClick={submit}>Edit Playlist</button> */}
      <div>
        <NavLink to={`/playlists/${playlistId}/edit`}>
          {/* <EditPlaylistForm /> */}
          <img
            src={playlist.playlist_img_url}
            style={{ width: 200, height: 200 }}
          />
          edit
        </NavLink>
      </div>

      <div>
        {user && playlist && user.id === playlist.user_id && (
          <button className="delete-playlist" onClick={deletePlaylist}>
            Delete
          </button>
        )}
      </div>

      {/* <button style={{ width: 50 }} onClick={deletePlaylist}>
        delete
      </button> */}

      <div>
        <PlayThisButton
          id={playlist.id}
          isPlaylist={true}
        />
        <p>{playlist.title}</p>
      </div>
      <div>
        <p>{playlist.description}</p>
      </div>
      <div>
        <p>number of songs: {getSongs(playlist).length}</p>
      </div>
      <div style={{ whiteSpace: "pre-line" }}>
        {getSongs(playlist)
          .map((song) => song.title)
          .join("\n")}
      </div>
    </>
  );
};

export default SinglePlaylistDetails;
