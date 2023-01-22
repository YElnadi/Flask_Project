import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteSongThunk } from "../store/albums";

const SongDeleteButton = ({ song, index }) => {
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.singleAlbum);
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteSong = (e) => {
    e.preventDefault();
    return dispatch(deleteSongThunk(song.id, index)).then(
      history.push(`/albums/${album.id}`)
    );
  };

  return (
    <>
      {user && album && album.owner_id === user.id && (
        <button onClick={deleteSong} className="demo-btn" style={{color:'whitesmoke'}}>
          Delete
        </button>
      )}
    </>
  );
};

export default SongDeleteButton;
