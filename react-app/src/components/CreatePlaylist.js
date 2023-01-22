import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewPlaylistThunk } from "../store/playlists";

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const myPlaylists = useSelector((state) => state.playlists.myPlaylists);

  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("My Playlist #");
  const [myPlaylistNumber, setMyPlaylistNumber] = useState(1);
  const [description, setDescription] = useState("");
  const [playlist_img_url, setPlaylistImgUrl] = useState(
    "https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg"
  );

  useEffect(() => {
    setMyPlaylistNumber(Object.values(myPlaylists).length + 1);
  }, [myPlaylists]);

  const submit = async (e) => {
    e.preventDefault();
    const newPlaylist = {
      title: `${title}${myPlaylistNumber}`,
      playlist_img_url: playlist_img_url,
      description: description,
      user_id: user.id,
    };
    return dispatch(createNewPlaylistThunk(newPlaylist)).then((playlist) => {
      const { id } = playlist;
      history.push(`/playlists/${id}`);
    });
  };

  return (
    <>
      <div id="create-playlist" onClick={submit} style={{cursor:'pointer'}}>
        Create Playlist
      </div>
    </>
  );
};

export default CreatePlaylist;
