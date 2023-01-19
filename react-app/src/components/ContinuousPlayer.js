import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const Player = () => {
  const queue = useSelector((state) => state.songs.queue);
  const [currentTrack, setTrackIndex] = useState(0);
  const handleClickNext = () => {
    console.log("click next");
    setTrackIndex((currentTrack) =>
      currentTrack < queue.length - 1 ? currentTrack + 1 : 0
    );
  };

  const handleEnd = () => {
    console.log("end");
    setTrackIndex((currentTrack) =>
      currentTrack < queue.length - 1 ? currentTrack + 1 : 0
    );
  };
  if (queue.length) {
    return (
      <AudioPlayer
        volume="0.5"
        src={queue[currentTrack].song_url}
        showSkipControls
        onClickNext={handleClickNext}
        onEnded={handleEnd}
        // Try other props!
      />
    );
  } else {
    return (
      <AudioPlayer
        src={""}
        // Try other props!
      />
    );
  }
};

export default Player;
