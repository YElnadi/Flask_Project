import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneAlbumThunk } from "../store/albums";
import { deleteAlbumThunk } from "../store/albums";
import SongDeleteButton from "./SongDeleteButton";

const SingleAlbumDetail = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums.singleAlbum);
  const user = useSelector((state) => state.session.user);

  const deleteAlbum = (e) => {
    e.preventDefault();
    return dispatch(deleteAlbumThunk(albumId)).then(history.push("/"));
  };

  const addToAlbum = (e) => {
    e.preventDefault();
    history.push(`/albums/${album.id}/add`);
  };

  useEffect(() => {
    dispatch(getOneAlbumThunk(albumId));
  }, [dispatch, albumId]);

  return (
    <>
      {Object.values(album).length && (
        <>
          <h1>You are in the album</h1>
          <div>
            <img
              src={album.album_img_url}
              style={{ width: 200, height: 200 }}
            />
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
          {user &&
            album &&
            album.songs.length &&
            album.songs.map((song, index) => (
              <div className="song-details-container" key={song}>
                <div className="song-details-title">{song.title}</div>

                <SongDeleteButton song={song} index={index} />
              </div>
            ))}
          {user && album && user.id === album.owner_id && (
            <button className="add-song-button" onClick={addToAlbum}>
              Add song
            </button>
          )}
        </>
      )}
    </>
  );
};

export default SingleAlbumDetail;
