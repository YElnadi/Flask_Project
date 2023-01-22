import { useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOnePlaylistThunk } from "../store/playlists";
import "./HomePage.css";

const PlaylistCard = ({
  title,
  image_url,
  maker,
  id,
  description,
  album,
  playlist,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const openPlayListCard = (e) => {
    return dispatch(getOnePlaylistThunk(id)).then(
      history.push(`/playlists/${id}`)
    );
  };

  return (
    <>
      <div className="playlist-card-container">
        <div className="image-container">
          <img
            style={{ width: 150, height: 150 }}
            src={image_url}
            onClick={openPlayListCard}
          ></img>
        </div>
        <div className="card-title">{title}</div>

        {description !== undefined && (
          <div className="card-playlist-description">{description}</div>
        )}
        <div className="card-maker">{maker}</div>
      </div>
    </>
  );
};

export default PlaylistCard;
