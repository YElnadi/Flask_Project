import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';



const EditSongForm = ({song}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState(song.title)
    const {albumId} = useParams()

   

  return (
    <div>
        <form>

        </form>
      
    </div>
  );
}

export default EditSongForm;
