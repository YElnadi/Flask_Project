const LOAD_ALBUMS = "albums/LOAD_ALBUMS";

// ACTION CREATOR
const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums: albums.albums,
});

// THUNK
export const loadAlbumsThunk = () => async (dispatch) => {
  const response = await fetch("/api/albums/");

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(loadAlbums(data));
  }
};
// INITIAL STATE
const initialState = { allAlbums: {} };

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALBUMS: {
      const newState = { allAlbums: {} };
      action.albums.forEach((album) => {
        newState.allAlbums[album.id] = album;
      });
      return newState;
    }
    default:
      return state;
  }
}
