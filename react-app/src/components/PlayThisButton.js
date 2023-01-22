import { useSelector, useDispatch } from "react-redux";
import { loadSongsThunk } from "../store/songs";

const PlayThisButton = ({ id, isPlaylist }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const albums = useSelector((state) => state.albums);
  const playlist = useSelector((state) => state.playlists.singlePlaylist);
  const album = useSelector (state => state.albums.singleAlbum)

  const submit = async (e) => {
    e.preventDefault();
    if (isPlaylist) {
      const songs = playlist.songs;
      await dispatch(loadSongsThunk(songs));
    } else {
      const songs = album.songs;
      await dispatch(loadSongsThunk(songs));
    }
  };

  return (
    <>{user && <i className="fa-regular fa-circle-play" onClick={submit} style={{cursor:'pointer'}}></i>}</>
  );
};

export default PlayThisButton;
//  <i class="fa-regular fa-circle-play"></i>
