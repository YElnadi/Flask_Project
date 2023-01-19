import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewAlbumThunk } from "../store/albums";

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const albums = useSelector((state) => state.allAlbums);
  console.log("$$$$albums", albums);

  const user = useSelector((state) => state.session.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [album_img_url, setAlbumImgUrl] = useState(
    "https://spotify8bucket.s3.amazonaws.com/9112b72eeb314f0c9aa8670f9f32064c.jpeg"
  );
  const [artist, setArtist] = useState("");

  //   useEffect(async()=>{
  //       await dispatch(createNewPlaylistThunk())
  //   }, [dispatch])

  const submit = async (e) => {
    e.preventDefault();
    const newAlbum = {
      title: title,
      album_img_url: album_img_url,
      artist: artist,
    };
    return dispatch(createNewAlbumThunk(newAlbum)).then((album) => {
      const { id } = album;
      history.push(`/albums/${id}`);
    });
  };

  return (
    <>
      <div id="create-album" onClick={submit}>
        Create Album
      </div>
    </>
  );
};

export default CreateAlbum;
