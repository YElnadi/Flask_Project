import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {createNewPlaylistThunk} from '../store/playlists'
import { useParams } from "react-router-dom";

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {newPlaylistId} = useParams()
  console.log('$$$$$newplaylistID', newPlaylistId)

  const playlist = useSelector(state =>state.allPlaylists)
  console.log("$$$$playlist", playlist)

  const user = useSelector(state=>state.session.user)

  const [title, setTitle] = useState('My Playlist#');
  const [description, setDescription] = useState('');
  const [playlist_img_url, setPlaylistImgUrl] = useState('')

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePlaylistImgUrl = (e) => setPlaylistImgUrl(e.target.value);


//   useEffect(async()=>{
//       await dispatch(createNewPlaylistThunk())
//   }, [dispatch])

    const createPlaylist = async (e) =>{
        e.preventDefault()
        const newPlaylist = {
            "title":title,
            "playlist_img_url":playlist_img_url,
            "description":description,
            "user_id":user.id
        }
        await dispatch(createNewPlaylistThunk(newPlaylist))
    }

 
  
   

  return (
      <>
    <div>
      <h1>New PlayList Form</h1>
    </div>
    <div>
    </div>
    </>
  );
};

export default CreatePlaylist;
