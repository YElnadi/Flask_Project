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
            style={{ width: 350, height: 200}}
            src={image_url}
            onClick={openCard}
            alt="This should be the Album img"
          ></img>
        </div>
        <div style={{paddingBottom:55}}>
          <div style={{ display: "flex", flexDirection:'column', lineHeight:0 }}>
            <div className="card-title"  >{title} </div>
            <div style={{ display:'flex', justifyContent: "flex-end" }}>
              <PlayThisButton id={id} isPlaylist={false} />
            </div>
          </div>
          {description !== undefined && (
          <div className="card-playlist-description">{description}</div>
        )}
          <div className="card-maker">by {maker}</div>
        </div>
      </div>
    </>
  );
};

export default SpotCards;
