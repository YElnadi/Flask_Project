import React, { useState, useEffect } from "react";

const ViewSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/songs");
      if (res.ok) {
        const data = await res.json();

        // url = data.songs[0].url;

        setSongs(data.songs);
      } else {
        console.log("error");
      }
    })();
  }, []);

  // const play = () => {
  //   const audio = new Audio(url);
  //   audio.play();
  // };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <h1>Songs</h1>
      {songs.map((song) => (
        <div
          key={song.id}
          style={{
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "50%",
            height: 50,
            margin: 10,
            backgroundColor: "red",
          }}
        >
          <p> {song.url} </p>
          <button onClick={() => alert("hi world")}>Play Audio</button>
        </div>
      ))}
    </div>
  );
};

export default ViewSongs;
