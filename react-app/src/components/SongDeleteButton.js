import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SongDeleteButton = ({ song }) => {
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.singleAlbum);

  const deleteSong = (e) => {
    e.preventDefault();
    return dispatch(deleteSongThunk(song.id))
  };

  return (
    <>
      {user && album && album.owner_id === user.id && (
        <button onClick={deleteSong} className="delete-song-btn">
          Delete
        </button>
      )}
    </>
  );
};
