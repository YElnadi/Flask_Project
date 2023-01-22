import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import UploadImages from "./components/file_upload/UploadImages";
import UploadSongs from "./components/file_upload/UploadSongs";
import ViewImages from "./components/file_upload/ViewImages";
import ViewSongs from "./components/file_upload/ViewSongs";
import HomePage from "./components/HomePage";
import SingleAlbumDetail from "./components/SingleAlbumDetail";
import SinglePlaylistDetails from "./components/SinglePlaylistDetails";
import CreatePlaylist from "./components/CreatePlaylist";
import Search from "./components/search/search";
import Player from "./components/ContinuousPlayer";
import "./App.css";
import EditPlaylistForm from "./components/EditPlaylistForm";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/upload-image" exact={true}>
          <UploadImages />
        </Route>
        <Route path="/upload-song" exact={true}>
          <UploadSongs />
        </Route>
        <Route path="/songs" exact={true}>
          <ViewSongs />
        </Route>
        <Route path="/images" exact={true}>
          <ViewImages />
        </Route>
        <Route path="/albums/:albumId" exact={true}>
          <SingleAlbumDetail />
        </Route>
        <Route path="/albums/:albumId/add" exact={true}>
          <UploadSongs />
        </Route>
        <Route path="/playlists/:playlistId" exact={true}>
          <SinglePlaylistDetails />
        </Route>
        <Route path="/playlists/:playlistId/edit" exact={true}>
          <EditPlaylistForm />
        </Route>

        <Route path="/playlists/" exact={true}>
          <CreatePlaylist />
        </Route>
        <Route path="/search" exact={true}>
          <Search />
        </Route>
        <Route path="/audio-player" exact={true}>
          <Player />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
