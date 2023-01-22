import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/session';

const LogoutButton = () => {
  //const hover = useHover({backgroundColor: "LightBlue"})  
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} style ={{borderRadius:'20px' , padding:10, borderColor:'whitesmoke', backgroundColor:'transparent', color:'whitesmoke', cursor:'pointer'}}>Log out</button>;
};

export default LogoutButton;
