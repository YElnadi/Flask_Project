import { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneAlbumThunk } from "../store/albums";
import { deleteAlbumThunk } from "../store/albums";
import SongDeleteButton from "./SongDeleteButton";
import EditSongForm from "./EditSongForm";
import AddSongToPlaylistButton from "./AddSongToPlaylistButton";
import PlayThisButton from "./PlayThisButton";
import CreateAlbum from "./CreateAlbum";
import CreatePlaylist from "./CreatePlaylist";
import "./HomePage.css";

const SingleAlbumDetail = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums.singleAlbum);
  const user = useSelector((state) => state.session.user);
  const myPlaylists = useSelector((state) => state.playlists.myPlaylists);

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
    <div className="homepage-below-nav">
      <div className="side-nav-bar">
        <p>
          <NavLink to="/" exact={true} activeClassName="active">
            <i
              class="fa-solid fa-house"
              style={{ color: "#b3b3b3", margin: "0px 10px" }}
            ></i>
            Home
          </NavLink>
        </p>
        <p>
          <NavLink to="/search" exact={true} activeClassName="active">
            <i
              class="fa-solid fa-magnifying-glass"
              style={{ color: "#b3b3b3", margin: "0px 10px" }}
            ></i>
            Search
          </NavLink>
        </p>
        <p>{user && <CreatePlaylist />}</p>
        <p>{user && <CreateAlbum />}</p>
      </div>

      {Object.values(album).length && (
        <div className="album-page-detail">
          <h1>You are in the album</h1>
          <div>
            <img
              src={album.album_img_url}
              style={{ width: 200, height: 200 }}
            />
          </div>
          <div>
            {user && album && user.id === album.owner_id && (
              <button
                className="demo-btn"
                style={{ color: "whitesmoke" }}
                onClick={deleteAlbum}
              >
                Delete
              </button>
            )}
          </div>
          <div>
            <PlayThisButton id={albumId} isPlaylist={false} />
            <p>{album.title}</p>
          </div>
          {user &&
            album &&
            album.songs.map((song, index) => (
              <div
                className="song-details-container"
                key={`${song}-${song.id}`}
              >
                <div className="song-details-title">{song.title}</div>

                <SongDeleteButton song={song} index={index} />
                {user.id === album.owner_id && (
                  <EditSongForm
                    buttonClicked={false}
                    song={song}
                    index={index}
                  />
                )}
                {user.id && (
                  <AddSongToPlaylistButton buttonClicked={false} song={song} />
                )}
              </div>
            ))}
          <div>{album.songs.length} Songs</div>
          {user && album && user.id === album.owner_id && (
            <button
              className="demo-btn"
              style={{ color: "whitesmoke" }}
              onClick={addToAlbum}
            >
              Add song
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleAlbumDetail;
