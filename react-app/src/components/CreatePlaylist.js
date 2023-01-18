import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {createNewPlaylistThunk} from '../store/playlists'

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  const playlists = useSelector(state =>state.allPlaylists)
  console.log("$$$$playlist", playlists)

  const user = useSelector(state=>state.session.user)


  const [title, setTitle] = useState('My Playlist#');
  const [description, setDescription] = useState('');
  const [playlist_img_url, setPlaylistImgUrl] = useState('https://emby.media/community/uploads/inline/355992/5c1cc71abf1ee_genericcoverart.jpg')




//   useEffect(async()=>{
//       await dispatch(createNewPlaylistThunk())
//   }, [dispatch])

    const submit = async (e) =>{
        e.preventDefault()
        const newPlaylist = {
            "title":title,
            "playlist_img_url":playlist_img_url,
            "description":description,
            "user_id":user.id
        }
        return dispatch(createNewPlaylistThunk(newPlaylist))
          .then((playlist) => {
            const { id } = playlist;
            history.push(`/playlists/${id}`);
          })

    }





  return (
      <>
    <div id="create-playlist" onClick={submit}>
      Create Playlist
    </div>
    </>
  );
};

export default CreatePlaylist;
