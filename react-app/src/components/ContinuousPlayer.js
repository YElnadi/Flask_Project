// import React from "react";
// // import ReactPlayer from "react-player";
// import AudioPlayer from "react-h5-audio-player"

// // Render a YouTube video player

// // export default function AudioPlayer() {
// //   // return <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />;
// //   return <ReactPlayer url="https://spotify8bucket.s3.amazonaws.com/2a4e24014beb4f1fa1325e88424ceb04.mp3" />;
// // }

// export default function ContinuousPlayer() {
//   const AudioPlayer = window.ReactH5AudioPlayer.default;
//   return (
//     <div style={{ width: "100%" }}>
//       <h1>Hello, audio player!</h1>
//       <AudioPlayer
//         src="https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3"
//         volume={0.5}
//         // Try other props!
//       />
//     </div>
//   );
// }

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (
  <AudioPlayer
    autoPlay
    src="https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3"
    onPlay={(e) => console.log("onPlay")}
    // other props here
  />
);

export default Player;
