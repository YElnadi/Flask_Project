import { useHistory } from "react-router-dom";
import "./HomePage.css";

const AlbumCard = ({
  title,
  image_url,
  maker,
  id,
  description,
  album,
  playlist,
}) => {
  const history = useHistory();

  const openAlbumCard = (e) => {
    history.push(`/albums/${id}`);
  };

  return (
    <>
      <div className="single-card-container">
        <div className="image-container">
          <img
            style={{ width: 200, height: 200 }}
            src={image_url}
            onClick={openAlbumCard}
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

export default AlbumCard;
