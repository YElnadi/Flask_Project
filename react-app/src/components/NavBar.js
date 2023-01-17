
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';



const NavBar = () => {
  const user = useSelector(state=>state.session.user)
  const dispatch = useDispatch()

  return (
    <>
      <div className='top-nav-bar'>
        <p>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </p>
      </div>
      <div className='side-nav-bar'>
        <p>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </p>
        <p>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </p>
        <p>
          {user !== null && 
            <LogoutButton />
          }
        </p>
      </div>
    </>
  );
}

export default NavBar;
