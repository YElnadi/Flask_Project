import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { editSongThunk, getOneAlbumThunk } from "../store/albums";
// buttonOn is an boolean that will determine what this component renders

const EditSongForm = ({ song, buttonClicked, index }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const [title, setTitle] = useState(song.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedSong = { ...song };
    editedSong.title = title;
    return dispatch(editSongThunk(editedSong, index))
      .then(dispatch(getOneAlbumThunk(song.album_id)))
      .then(history.push(`/albums/${song.album_id}`))
      .then(setButtonOn(false));
  };

  const renderForm = (e) => {
    e.preventDefault();
    setButtonOn(true);
  };

  const cancel = (e) => {
    e.preventDefault();
    setButtonOn(false);
  };

  if (!buttonOn) {
    return (
      <button onClick={renderForm} className="demo-btn" style={{color:'whitesmoke'}} >
        Edit Song Title
      </button>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="song-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <button onClick={cancel} className="demo-btn" style={{color:'whitesmoke'}}>
          Cancel
        </button>
        <button className="demo-btn" style={{color:'whitesmoke'}} type="submit">
          Save
        </button>
      </form>
    );
  }
};

export default EditSongForm;
