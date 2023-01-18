const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const GET_ONE_PLAYLIST = "playlist/GET_ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlist/CREATE_PLAYLIST";

// action creators
const loadPlaylists = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const getOnePlaylist = (playlist) => ({
  type: GET_ONE_PLAYLIST,
  playlist,
});

const createNewPlaylist = (newPlaylist) => ({
  type: CREATE_PLAYLIST,
  newPlaylist,
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

export const getOnePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`);
  if (response.ok) {
    const onePlaylist = await response.json();
    dispatch(getOnePlaylist(onePlaylist));
    return onePlaylist;
  }
};

export const createNewPlaylistThunk = (newPlaylist) => async (dispatch) => {
  const response = await fetch(`/api/playlists/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlaylist),
  })
  if (response.ok) {
    const newCreatedPlaylist = await response.json();
    dispatch(createNewPlaylist(newCreatedPlaylist));
    return newCreatedPlaylist;
  }
};

// main Reducer
const initialState = { allPlaylists: {}, singlePlaylist: {} };
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYLISTS: {
      const newState = { allPlaylists: {}, singlePlaylist: {} };
      action.playlists.forEach((playlist) => {
        newState.allPlaylists[playlist.id] = playlist;
      });
      return newState;
    }
    case GET_ONE_PLAYLIST: {
      const newState = {
        allPlaylists: {},
        singlePlaylist: action.playlist,
      };
      return newState;
    }
    case CREATE_PLAYLIST:{
      const newState={
        ...state,
        allPlaylists:{...state.allPlaylists}
      }
      newState.allPlaylists[action.newPlaylist.id] = action.newPlaylist
      return newState
    }
    default:
      return state;
  }
}
