import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import {createNewPlaylistThunk} from '../store/playlists'
import EditPlaylistModal from "./EditPlayListModal";
import "./HomePage.css";
import logo from "../static/images/spoti8-logo.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="top-nav-bar">
      <img src={logo} 
      style={{position: 'fixed', top: 15, left: 30, width: 100, height: 100}}/>

      {/*----------- navigation top right: login ------------ */}
      <div className="nav-top-innerdiv">
        {user === null && (
          <>
            <p>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </p>
            <p>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
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
  );
};

export default NavBar;
