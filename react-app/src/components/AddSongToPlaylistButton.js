import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addSongToPlaylistThunk } from "../store/playlists";
import './HomePage.css'

const AddSongToPlaylistButton = ({ song, buttonClicked }) => {
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const [playlistIdOption, setPlaylistIdOption] = useState(null);
  const [options, setOptions] = useState([]);
  const myPlaylists = useSelector((state) => state.playlists.myPlaylists);

  const dispatch = useDispatch();
  useEffect(() => {
    // instantiates new options for the Select Field
    const updatedOptions = [];
    if (Object.values(myPlaylists).length) {
      // Creates datapoints and populates the options
      Object.values(myPlaylists).forEach((playlist) => {
        const newDataPoint = {};
        newDataPoint.value = playlist.id;
        newDataPoint.label = playlist.title;
        updatedOptions.push(newDataPoint);
      });
    }

    // Setting the options for the Select Field
    setOptions(updatedOptions);
  }, [dispatch, myPlaylists]);

  const handleChange = (option) => {
    setPlaylistIdOption(option.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(addSongToPlaylistThunk(song.id, playlistIdOption)).then(
      setButtonOn(false)
    );
  };

  const renderForm = (e) => {
    e.preventDefault();
    setButtonOn(true);
  };

  const cancel = (e) => {
    e.preventDefault();
    setButtonOn(false);
  };
  if (!Object.values(myPlaylists).length){
    return null;
  }
  if (!buttonOn) {
    return (
      <button onClick={renderForm}  className="demo-btn" style={{color:'whitesmoke'}}>
        Add Song to Playlist
      </button>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Select options={options} onChange={handleChange} autoFocus={true}  />
        <button onClick={cancel} className="demo-btn" style={{color:'whitesmoke'}}>
          Cancel
        </button>
        <button type="submit" value="Submit" className="demo-btn" style={{color:'whitesmoke'}}>
          Add to Playlist
        </button>
      </form>
    );
  }
};

export default AddSongToPlaylistButton;
