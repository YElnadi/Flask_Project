import { NavLink, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";


const SingleAlbumDetail = ({ title, image_url, maker, id }) => {
  const history = useHistory();

  const openCard = (e) => {
    history.push(`/albums/${album.id}`);
  };

  return (
    <>
      <div className="card-container">
        <div className="image-container">
          <img
            style={{ width: 200, height: 200 }}
            src={image_url}
            onClick={openCard}
          ></img>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-maker">{maker}</div>
      </div>
    </>
  );
};

export default SpotCards;
