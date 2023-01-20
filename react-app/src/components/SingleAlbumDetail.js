import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneAlbumThunk } from "../store/albums";
import { deleteAlbumThunk } from "../store/albums";

const SingleAlbumDetail = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums.singleAlbum);
  const user = useSelector((state) => state.session.user);

  const getSongs = (album) => {
    const songs = album.songs !== undefined ? album.songs : [];
    return Object.values(songs);
  };

  const deleteAlbum = (e) => {
    e.preventDefault();
    return dispatch(deleteAlbumThunk(albumId))
    .then(history.push("/"));
  };

  const addToAlbum = (e) =>{
    e.preventDefault();
    history.push(`/albums/${album.id}/add`)
  }

  useEffect(async () => {
    await dispatch(getOneAlbumThunk(albumId));
  }, [dispatch, albumId]);

  return (
    <>
      <h1>You are in the album</h1>
      <div>
        <img src={album.album_img_url} style={{ width: 200, height: 200 }} />
      </div>
      <div>
        {user && album && user.id === album.owner_id && (
          <button className="delete-album" onClick={deleteAlbum}>
            Delete
          </button>
        )}
      </div>
      <div>
        <p>{album.title}</p>
      </div>
      <div>{getSongs(album).length}</div>
      <div style={{ whiteSpace: "pre-line" }}>
        {getSongs(album)
          .map((song) => song.title)
          .join("\n")}
      </div>
      {user && album && user.id === album.owner_id && (
          <button className="add-song-button" onClick={addToAlbum}>
            Add song
          </button>
        )}
    </>
  );
};

export default SingleAlbumDetail;
