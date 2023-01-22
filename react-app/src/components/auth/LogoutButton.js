import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/session';

const LogoutButton = () => {
  //const hover = useHover({backgroundColor: "LightBlue"})  
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button onClick={onLogout} style ={{borderRadius:'20px' , padding:10, borderColor:'whitesmoke', backgroundColor:'transparent', color:'whitesmoke', cursor:'pointer'}}>Log out</button>;
};

export default LogoutButton;
