import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { useState } from "react";
// // import 'react-h5-audio-player/lib/styles.less' Use LESS
// // import 'react-h5-audio-player/src/styles.scss' Use SASS

// const Player = () => {
//   const queue = useSelector((state) => state.songs.queue);
//   const [currentTrack, setCurrentTrackIndex] = useState(0);

//   return (
//     <AudioPlayer
//       autoPlay
//       src="https://spotify8bucket.s3.amazonaws.com/3c11c9105e734eaf906a4dac2fc52b16.mp3"
//       onPlay={(e) => console.log("onPlay")}
//       // other props here
//     />
//   );
// };

// export default Player;

//////////////////////////////////////////////////
const playlist = [
  { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3' },
  { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' },
  { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3' },
]

const Player = () => {
  const [currentTrack, setTrackIndex] = useState(0)
  const handleClickNext = () => {
      console.log('click next')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };
  
  const handleEnd = () => {
    console.log('end')
    setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
  }
  return (
      <div className="container">
        <h1>Hello, audio player!</h1>
        <AudioPlayer
          volume="0.5"
          src={playlist[currentTrack].src}
          showSkipControls
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          // Try other props!
        />
        <p>
          <a href="https://github.com/lhz516/react-h5-audio-player" target="_blank">See Docs on Github</a>
         </p>
      </div>
    );
}



export default Player;
