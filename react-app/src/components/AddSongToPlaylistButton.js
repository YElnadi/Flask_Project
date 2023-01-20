import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { addSongToPlaylistThunk } from "../store/playlists";

const AddSongToPlaylistButton = ({ song, buttonClicked }) => {
  const [buttonOn, setButtonOn] = useState(buttonClicked);
  const [playlistIdOption, setPlaylistIdOption] = useState(null);
  const [options, setOptions] = useState([]);
  const myPlaylists = useSelector((state) => state.playlists.myPlaylists);

  const dispatch = useDispatch();
  useEffect(() => {
    // instantiates new options for the Select Field
    const updatedOptions = [];
    // Creates datapoints and populates the options
    Object.values(myPlaylists).forEach((playlist) => {
      const newDataPoint = {};
      newDataPoint.value = playlist.id;
      newDataPoint.label = playlist.title;
      updatedOptions.push(newDataPoint);
    });
    // Setting the options for the Select Field
    setOptions(updatedOptions);
  }, [dispatch, myPlaylists]);
  // if (buttonClicked) {
  //   // instantiates new options for the Select Field
  //   const updatedOptions = [];
  //   // Creates datapoints and populates the options
  //   Object.values(myPlaylists).forEach((playlist) => {
  //     const newDataPoint = {};
  //     newDataPoint.value = playlist.id;
  //     newDataPoint.label = playlist.title;
  //     updatedOptions.push(newDataPoint);
  //   });
  //   // Setting the options for the Select Field
  //   setOptions(updatedOptions);
  // }

  const handleChange = (option) => {
    setPlaylistIdOption(option.value);
    console.log(`Option selected:`, playlistIdOption);
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

  if (!buttonOn) {
    return (
      <button onClick={renderForm} className="edit-song-button">
        Add Song to Playlist
      </button>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Select options={options} onChange={handleChange} autoFocus={true} />
        <button onClick={cancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" value="Submit">
          Add to Playlist
        </button>
        >
      </form>
    );
  }
};

export default AddSongToPlaylistButton;
