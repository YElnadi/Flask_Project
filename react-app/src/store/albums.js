const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const GET_ONE_ALBUM = "albums/GET_ONE_ALBUM"

// ACTION CREATOR
const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums,
});


const getOneAlbum = album =>({
  type:GET_ONE_ALBUM,
  album
})

// THUNK
export const loadAlbumsThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/");

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(loadAlbums(data.albums));
  }
};

export const getOneAlbumThunk = id => async (dispatch) => {
  const response = await fetch(`/api/albums/${id}`);
  if(response.ok){
    const oneAlbum = await response.json();
    dispatch(getOneAlbum(oneAlbum))
    return oneAlbum
  }
}






// INITIAL STATE
const initialState = { allAlbums: {} , singleAlbum:{}};

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALBUMS: {
      const newState = { allAlbums: {}, singleAlbum:{} };
      action.albums.forEach((album) => {
        newState.allAlbums[album.id] = album;
      });
      return newState;
    }
    case GET_ONE_ALBUM:{
      const newState = {
        allAlbums:{},
        singleAlbum:action.album
      }
      return newState
    }
      
    default:
      return state;
  }
}
