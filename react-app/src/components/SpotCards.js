import { useHistory } from "react-router-dom";
import PlayThisButton from "./PlayThisButton";
import "./HomePage.css";

const SpotCards = ({ title, image_url, maker, id, description }) => {
  const history = useHistory();

  const openCard = (e) => {
    history.push(`/albums/${id}`);
  };

  return (
    <>
      <div className="single-card-container">
        <div className="image-container">
          <img
            style={{ width: 200, height: 200 }}
            src={image_url}
            onClick={openCard}
            alt="This should be the Album img"
          ></img>
        </div>
        <div className="card-title">{title}</div>
        {/* <PlayThisButton id={id} isPlaylist={false} /> */}
        {description !== undefined && (
          <div className="card-playlist-description">{description}</div>
        )}
        <div className="card-maker">by {maker}</div>
      </div>
    </>
  );
};

export default SpotCards;
