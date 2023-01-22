import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as playlistThunks from "../../store/playlists";
import "./search.css";
import songImage from "../../static/images/song-cover.jpeg";
import CreateAlbum from "../CreateAlbum";
import CreatePlaylist from "../CreatePlaylist";
import "../HomePage.css";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  // const [showAlbums, setShowAlbums] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await dispatch(playlistThunks.loadPlaylistThunk());
      setPlaylists(data);
    })();
    (async () => {
      const allAlbumReturns = await fetch("/api/albums");
      const allAlbums = await allAlbumReturns.json();
      setAlbums(allAlbums.albums);
    })();
    (async () => {
      const allSongsReturns = await fetch("/api/songs");
      const allSongs = await allSongsReturns.json();
      setSongs(allSongs.songs);
    })();
    (async () => {
      const allUsersReturns = await fetch("/api/users");
      const allUsers = await allUsersReturns.json();
      setUsers(allUsers);
    })();
  }, [
    dispatch,
    fetch,
    setPlaylists,
    setAlbums,
    setSongs,
    setUsers,
    searchShow,
  ]);

  console.log("users", users);
  console.log("playlists", playlists);
  console.log("albums", albums);
  console.log("songs", songs);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  return (
    <div className="main-container" style={{ marginTop: 80 }}>
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

      <div className="search-page-detail">
        <input
          type="search"
          placeholder="What do you want to listen to?"
          onChange={handleInput}
          value={searchInput}
          style={{
            marginLeft: "4%",
            marginTop: "20px",
            paddingLeft: "35px",
            borderRadius: "25px",
            height: "45px",
            width: "400px",
            position: "sticky",
            top: "2px",
            border: "1px solid red",
          }}
        ></input>
        <i
          id="search-button-icon"
          type="submit"
          class="fa-solid fa-magnifying-glass"
        ></i>

        {/*---------------- album div -----------------*/}

        <div className="album-container">
          <h1 hidden={searchShow ? false : true}> Albums </h1>
          <div className="search-results-container">
            {albums
              .filter((album) => {
                if (searchInput === "") {
                  return album;
                } else if (
                  album.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return album;
                }
              })
              .map(
                (album, index) =>
                  searchShow === true && (
                    <div
                      onClick={(e) => history.push(`/albums/${album.id}`)}
                      className="album-cards"
                      key={index}
                    >
                      <img className="album-image" src={album.album_img_url} />
                      <p>{album.title}</p>
                    </div>
                  )
              )}
          </div>

          {/*---------------- playlist div -----------------*/}

          <h1 hidden={searchShow ? false : true}> Playlists </h1>
          <div className="search-results-container">
            {playlists
              .filter((playlist) => {
                if (searchInput === "") {
                  return playlist;
                } else if (
                  playlist.title
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  return playlist;
                }
              })
              .map(
                (playlist, index) =>
                  searchShow === true && (
                    <div
                      onClick={(e) => history.push(`/playlists/${playlist.id}`)}
                      className="playlist-cards"
                      key={index}
                    >
                      <img
                        className="playlist-search-image"
                        src={playlist.playlist_img_url}
                      />
                      <p>{playlist.title}</p>
                      <span
                        style={{ marginLeft: "15px", paddingBottom: "20px" }}
                      >
                        {/* By {playlist.user.username} */}
                        {playlist.description}
                      </span>
                    </div>
                  )
              )}
          </div>

          {/*---------------- song div -----------------*/}

          <h1 hidden={searchShow ? false : true}> Songs </h1>
          <div
            className="search-results-container"
            style={{ paddingBottom: 80 }}
          >
            {songs
              .filter((song) => {
                if (searchInput === "") {
                  return song;
                } else if (
                  song.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return song;
                }
              })
              .map(
                (song, index) =>
                  searchShow === true && (
                    <div
                      onClick={(e) => history.push(`/albums/${song.album_id}`)}
                      className="album-cards"
                      key={index}
                    >
                      {/* <img className="album-image" src={song.song_img_url} /> */}
                      <img className="album-image" src={songImage} />
                      <p>{song.title}</p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
