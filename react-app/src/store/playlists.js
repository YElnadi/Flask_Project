const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const GET_ONE_PLAYLIST = "playlists/GET_ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const EDIT_PLAYLIST = "playlists/EDIT_PLAYLIST";
const DELETE_PLAYLIST = "/playlists/DELETE_PLAYLIST";
const LOAD_MY_PLAYLISTS = "playlists/LOAD_MY_PLAYLISTS";

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

const loadMyPlaylists = (data) => ({
  type: LOAD_MY_PLAYLISTS,
  data,
});
// thunk action creator
// export const loadPlaylistThunk = () => async (dispatch) => {
//   const response = await fetch("/api/playlists/");

const editPlaylist = (playlist) => ({
  type: EDIT_PLAYLIST,
  playlist,
});

const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    playlistId,
  };
};

export const loadPlaylistThunk = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadPlaylists(data.playlists));
    return data.playlists;
  } else {
    return response;
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
  });
  if (response.ok) {
    const newCreatedPlaylist = await response.json();
    dispatch(createNewPlaylist(newCreatedPlaylist));
    return newCreatedPlaylist;
  }
};

export const editPlaylistThunk = (playlist, id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });
  if (response.ok) {
    // const data = await response.json();
    dispatch(editPlaylist(playlist));
    return response;
  }
};

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // const data = await response.json();
    dispatch(deletePlaylist(playlistId));
    return response;
  }
};

export const loadMyPlaylistsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/user/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadMyPlaylists(data));
  }
};


// main Reducer
const initialState = { allPlaylists: {}, singlePlaylist: {}, myPlaylists: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PLAYLISTS: {
      const newState = {
        allPlaylists: {},
        singlePlaylist: {},
        myPlaylists: { ...state.myPlaylists },
      };
      action.playlists.forEach((playlist) => {
        newState.allPlaylists[playlist.id] = playlist;
      });
      return newState;
    }
    case GET_ONE_PLAYLIST: {
      const newState = {
        allPlaylists: {},
        singlePlaylist: action.playlist,
        myPlaylists: { ...state.myPlaylists },
      };
      return newState;
    }

    case CREATE_PLAYLIST: {
      const newState = {
        ...state,
        allPlaylists: { ...state.allPlaylists },
        singlePlaylist: action.newPlaylist,
        myPlaylists: { ...state.myPlaylists },
      };
      newState.allPlaylists[action.newPlaylist.id] = action.newPlaylist;
      newState.myPlaylists[action.newPlaylist.id] = action.newPlaylist;
      return newState;
    }
    case LOAD_MY_PLAYLISTS: {
      const newState = {
        ...state,
        allPlaylists: { ...state.allPlaylists },
        singlePlaylist:{...state.singlePlaylist},
        myPlaylists: {},
      };
      action.data.playlists.forEach((playlist) => {
        newState.myPlaylists[playlist.id] = playlist;
      });
      return newState;
    }

    case EDIT_PLAYLIST: {
      const newState = {
        allPlaylists: {...state.allPlaylists},
        singlePlaylist: { ...state.singlePlaylist },
        myPlaylists:{...state.myPlaylists}
      };
      newState.allPlaylists[action.playlist.id] = action.playlist;
      newState.myPlaylists[action.playlist.id] = action.playlist;
      newState.singlePlaylist=action.playlist;
      return newState;
    }

    case DELETE_PLAYLIST: {
      const newState = {
        allPlaylists: { ...state.allPlaylists },
        singlePlaylist: {},
        myPlaylists:{...state.myPlaylists}
      };
      delete newState.allPlaylists[action.playlistId];
      delete newState.myPlaylists[action.playlistId];
      return newState;
    }

    default:
      return state;
  }
}
