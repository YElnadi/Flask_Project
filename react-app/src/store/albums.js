const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const GET_ONE_ALBUM = "albums/GET_ONE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM"; 

// ACTION CREATOR
const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums,
});

const getOneAlbum = (album) => ({
  type: GET_ONE_ALBUM,
  album,
});

const createNewAlbum = (newAlbum) => ({
  type: CREATE_ALBUM, 
  newAlbum
})

// THUNK
export const loadAlbumsThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/");
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadAlbums(data.albums));
  }
};

export const getOneAlbumThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/albums/${id}`);
  if (response.ok) {
    const oneAlbum = await response.json();
    dispatch(getOneAlbum(oneAlbum));
    return oneAlbum;
  }
};

export const createNewAlbumThunk = (newAlbum) => async (dispatch) => {
  const response = await fetch(`/api/albums/`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(newAlbum)
  })
  if (response.ok) {
    const newCreatedAlbum = await response.json(); 
    dispatch(createNewAlbum(newCreatedAlbum)); 
    return newCreatedAlbum
  }
}


// INITIAL STATE
const initialState = { allAlbums: {}, singleAlbum: {} };

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALBUMS: {
      const newState = { allAlbums: {}, singleAlbum: { ...state.singleAlbum } };
      action.albums.forEach((album) => {
        newState.allAlbums[album.id] = album;
      });
      return newState;
    }
    case GET_ONE_ALBUM: {
      const newState = {
        allAlbums: { ...state.allAlbums },
        singleAlbum: action.album,
      };
      return newState;
    }
    case CREATE_ALBUM: {
      const newState = {
        ...state, 
        allAlbums: {...state.allAlbums}
      }
      newState.allAlbums[action.newAlbum.id] = action.newAlbum
      return newState
    }
    default:
      return state;
  }
}
