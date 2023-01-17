const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";

// action creators
const loadPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

// thunk action creator
export const loadPlaylistThunk = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(loadPlaylists(data.playlists));
  }
};

// main Reducer
const initialState = { allPlaylists: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYLISTS: {
      const newState = { allPlaylists: {} };
      action.playlists.forEach((playlist) => {
        newState.allPlaylists[playlist.id] = playlist;
      });
      return newState;
    }
    default:
      return state;
  }
}
