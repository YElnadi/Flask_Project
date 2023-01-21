import { useSelector, useDispatch } from "react-redux";
import { loadSongsThunk } from "../store/songs";

const PlayThisButton = ({ id, isPlaylist }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  const playlists = useSelector((state) => state.playlists);

  const submit = async (e) => {
    e.preventDefault();
    if (isPlaylist) {
      const songs = playlists.allPlaylists[id].songs;
      await dispatch(loadSongsThunk(songs));
    } else {
      const songs = albums.allAlbums[id].songs;
      await dispatch(loadSongsThunk(songs));
    }
  };

  return (
    <>{user && <i class="fa-regular fa-circle-play" onClick={submit}></i>}</>
  );
};

export default PlayThisButton;
//  <i class="fa-regular fa-circle-play"></i>
