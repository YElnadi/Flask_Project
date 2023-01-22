import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import {createNewPlaylistThunk} from '../store/playlists'
import CreatePlaylist from "./CreatePlaylist";
import CreateAlbum from "./CreateAlbum";
// import EditPlaylistModal from "./EditPlayListModal";
import DemoButton from "./DemoButton";
import EditPlaylistModal from "./EditPlayListModal";
import "./HomePage.css";
import logo from "../static/images/spoti8-logo.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const handleImgClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <>
      {/* <div className="top-nav-bar">
        <p>
          {!user && (
            <>
              <DemoButton />
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </>
          )}
        </p>
      </div> */}

      {/* <div className="side-nav-bar">
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

        {user && <CreatePlaylist />}
        {user && <CreateAlbum />}
      </div> */}

      <div className="top-nav-bar" >
        <img 
          src={logo}
          onClick={handleImgClick}
          style={{
            position: "fixed",
            top: 15,
            left: 30,
            width: 100,
            height: 100,
            cursor:'pointer'
          }}
        />

        {/*----------- navigation top right: login ------------ */}
        <div className="nav-top-innerdiv">
          {user === null && (
            <>
              <p>
                <DemoButton />
              </p>
              <p>
                <NavLink to="/sign-up" exact={true} activeClassName="active" className='sign-up-btn'>
                  Sign Up
                </NavLink>
              </p>
              <p>
                <NavLink to="/login" exact={true} activeClassName="active" className='login-btn'>
                  Log in
                </NavLink>
              </p>
            </>
          )}

          <p>{user !== null && <LogoutButton />}</p>

          {/* <p>
                  <NavLink to="/users" exact={true} activeClassName="active">
                    User
                  </NavLink>
                </p> */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
