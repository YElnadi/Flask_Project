import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { getOnePlaylistThunk } from "../store/playlists";
import PlayThisButton from "./PlayThisButton";

const SinglePlaylistCard = ({ playlist }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const openCard = (e) => {
    return dispatch(getOnePlaylistThunk(playlist.id)).then(
      history.push(`/playlists/${playlist.id}`)
    );
  };
  return (
    // <div>
    // <div style={{ display: "flex" }}>
    <div className="single-card-container">
      <div className="image-container">
        <img
          style={{ width: 200, height: 200 }}
          src={playlist.playlist_img_url}
          onClick={openCard}
        />
      </div>
      <div>{playlist.title}</div>

      {/* <PlayThisButton id={playlist.id} isPlaylist={true} /> */}

      <div>by {playlist.user} </div>
    </div>
    // </div>
  );
};

export default SinglePlaylistCard;
