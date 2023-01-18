import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditPlaylistForm = () => {
  const playlist = useSelector(state => state.playlists.singlePlaylist);

  return (
    <>
    <div> you are on the edit page </div>
    </>
  )
}

export default EditPlaylistForm;
