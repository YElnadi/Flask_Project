import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import '../HomePage.css'

const UploadSongs = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [song, setSong] = useState(null);
  const [title, setTitle] = useState("");
  const [songLoading, setSongLoading] = useState(false);

  const album = useSelector((state) => state.albums.singleAlbum);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // console.log("title:", title);
    // console.log("album_id:", album.id);
    formData.append("title", title);
    formData.append("album_id", album.id);
    formData.append("song", song);

    // Display the key/value pairs
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setSongLoading(true);
    
    const res = await fetch("/api/songs", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await res.json();
      setSongLoading(false);
      history.push(`/albums/${album.id}`);
    } else {
      setSongLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  const updateSong = (e) => {
    const file = e.target.files[0];
    setSong(file);
  };

  return (
    <div style={{padding: "200px 200px"}}>
      <form onSubmit={handleSubmit}>
        <input
          className="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          />

        <input type="file" accept="song/*" onChange={updateSong} className="demo-btn" style={{color:'whitesmoke'}} />
        <button type="submit" className="demo-btn" style={{color:'whitesmoke'}}>Submit</button>
        {songLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default UploadSongs;
