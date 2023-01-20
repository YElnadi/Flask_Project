import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import {createNewPlaylistThunk} from '../store/playlists'
import CreatePlaylist from "./CreatePlaylist";
import CreateAlbum from "./CreateAlbum";
import EditPlaylistModal from "./EditPlayListModal";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div className="top-nav-bar">
        <p>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </p>
      </div>
      <div className="side-nav-bar">
        <p>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink to="/search" exact={true} activeClassName="active">
            Search
          </NavLink>
        </p>
        <p>
          <NavLink to="/users" exact={true} activeClassName="active">
            User
          </NavLink>
        </p>

        {(user && <CreatePlaylist />)} 
        {(<CreateAlbum />)}

        <p>{user !== null && <LogoutButton />}</p>
      </div>
    </>
  );
};

export default NavBar;
