const LOAD_ALBUMS = "albums/LOAD_ALBUMS";
const GET_ONE_ALBUM = "albums/GET_ONE_ALBUM";
const CREATE_ALBUM = "album/CREATE_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM"
const DELETE_SONG = "album/DELETE_SONG"

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
  newAlbum,
});

const deleteAlbum = (albumId) => ({
  type:DELETE_ALBUM,
  albumId
})


const deleteSong = (songId) =>({
  type:DELETE_SONG,
  songId
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
    body: JSON.stringify(newAlbum),
  });
  if (response.ok) {
    const newCreatedAlbum = await response.json();
    dispatch(createNewAlbum(newCreatedAlbum));
    return newCreatedAlbum;
  }
};

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteAlbum(albumId));
    return response;
  }
};


export const deleteSongThunk = (songId) => async (dispatch) =>{
  const response = await fetch(`/api/songs/${songId}`, {
    method:"DELETE"
  });
  if(response.ok){
    dispatch(deleteSong(songId));
    return response; 
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
        allAlbums: { ...state.allAlbums },
        singleAlbum:{}
      };
      newState.allAlbums[action.newAlbum.id] = action.newAlbum;
      newState.singleAlbum=action.newAlbum
      return newState;
    }
    case DELETE_ALBUM:{
      const newState = {
        allAlbums:{...state.allAlbums},
        singleAlbum:{}
      }
      delete newState.allAlbums[action.albumId]
      return newState
    }
    default:
      return state;
  }
}
