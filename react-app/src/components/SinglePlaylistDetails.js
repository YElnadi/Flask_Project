import { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlaylistThunk } from "../store/playlists";
import EditPlaylistModal from "./EditPlayListModal";
import EditPlaylistForm from "./EditPlaylistForm";

const SinglePlaylistDetails = () => {
  const { playlistId } = useParams();
  // console.log("#####playlistId:", playlistId);
  const dispatch = useDispatch();
  const history = useHistory();
  const playlist = useSelector((state) => state.playlists.singlePlaylist);
  // console.log("####playlist", playlist)

  const getSongs = (playlist) => {
    const songs = playlist.songs !== undefined ? playlist.songs : [];
    return Object.values(songs);
  };
  const submit = (e) => {
    e.preventDefault();
    history.push(`/playlists/${playlistId}/edit`);
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
          />edit
        </NavLink>
      </div>
      <div>
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
