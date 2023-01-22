import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewAlbumThunk } from "../store/albums";

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = useSelector((state) => state.albums.allAlbums);
  const user = useSelector((state) => state.session.user);
  const [userAlbumNumber, setUserAlbumNumber] = useState(1);
  const [title, setTitle] = useState("My Album #");
  const [album_img_url, setAlbumImgUrl] = useState(
    "https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg"
  );
  useEffect(() => {
    let count = 1;
    Object.values(albums).forEach((album) => {
      if (album.owner_id === user.id) {
        count++;
      }
    });
    setUserAlbumNumber(count);
  }, [albums, user]);

  const submit = async (e) => {
    e.preventDefault();
    const newAlbum = {
      title: `${title}${userAlbumNumber}`,
      album_img_url: album_img_url,
      artist: user.username,
      owner_id: user.id,
    };

    return dispatch(createNewAlbumThunk(newAlbum)).then((album) => {
      const { id } = album;
      history.push(`/albums/${id}`);
    });
  };

  return (
    <>
      {user && (
        <div id="create-album" onClick={submit} style={{cursor:'pointer'}}>
          Create Album
        </div>
      )}
    </>
  );
};

export default CreateAlbum;
