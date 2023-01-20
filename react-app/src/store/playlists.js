const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const GET_ONE_PLAYLIST = "playlist/GET_ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlist/CREATE_PLAYLIST";
const EDIT_PLAYLIST = "playlist/EDIT_PLAYLIST";
const DELETE_PLAYLIST = "/playlists/deletePlaylist";

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

const editPlaylist = (playlist) => ({
	type: EDIT_PLAYLIST,
	playlist,
});

const deletePlaylist = (id) => {
	return {
		type: DELETE_PLAYLIST,
		id,
	};
};
// thunk action creator
// export const loadPlaylistThunk = () => async (dispatch) => {
//   const response = await fetch("/api/playlists/");

//   if (response.ok) {
//     const data = await response.json();
//     if (data.errors) {
//       return;
//     }

//     dispatch(loadPlaylists(data.playlists));
//     return data.Playlists
//   }
// };

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
		const data = await response.json();
		dispatch(editPlaylist(data));
		return data;
	} else {
		return response;
	}
};

export const deletePlaylistThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/playlists/${id}/`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(deletePlaylist(id));
		return data;
	} else {
		return response;
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

		case CREATE_PLAYLIST: {
			const newState = {
				...state,
				allPlaylists: { ...state.allPlaylists },
			};
			newState.allPlaylists[action.newPlaylist.id] = action.newPlaylist;
			return newState;
		}

		case EDIT_PLAYLIST: {
			const newState = {
				// allPlaylists: {...state.allPlaylists},
				singlePlaylist: { ...state.singlePlaylist },
			};
			newState[action.playlist.id] = action.playlist;
			return newState;
		}

		case DELETE_PLAYLIST: {
			const newState = { ...state };
			delete newState[action.id];
			return newState;
		}

		default:
			return state;
	}
}
