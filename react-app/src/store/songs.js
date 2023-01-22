const LOAD_SONGS = "songs/LOAD_SONGS";

// ACTION CREATOR
const loadSongs = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

// THUNK

export const loadSongsThunk = (songs) => async (dispatch) => {
  dispatch(loadSongs(songs));
};

// INITIAL STATE
const initialState = { queue: [] };

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SONGS: {
      const newState = { queue: [] };
      action.songs.forEach((song) => {
        newState.queue.push(song);
      });
      return newState;
    }

    default:
      return state;
  }
}
