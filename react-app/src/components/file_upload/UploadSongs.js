import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadSongs = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [song, setSong] = useState(null);
    const [songLoading, setSongLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song", song);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setSongLoading(true);

        const res = await fetch('/api/songs', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setSongLoading(false);
            history.push("/songs");
        }
        else {
            setSongLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateSong = (e) => {
        const file = e.target.files[0];
        setSong(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="song/*"
              onChange={updateSong}
            />
            <button type="submit">Submit</button>
            {(songLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadSongs;
