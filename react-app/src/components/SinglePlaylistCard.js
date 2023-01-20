import React from "react";
import { useSelector } from "react-redux";
import {
  NavLink,
  useHistory,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import PlayThisButton from "./PlayThisButton";

const SinglePlaylistCard = ({ playlist }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  console.log("#####user", user);

  const openCard = (e) => {
    history.push(`/playlists/${playlist.id}`);
  };
  return (
    <div >
      <div style={{ display: "flex" }}>
        <img
          style={{ width: 200, height: 200 }}
          src={playlist.playlist_img_url}
          onClick={openCard}
        />
      </div>
      <div>{playlist.title}</div>

      <PlayThisButton id={playlist.id} isPlaylist={true} />

      <div>by:{playlist.user} </div>
    </div>
  );
};

export default SinglePlaylistCard;
