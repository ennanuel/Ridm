import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayPlaylistPrompt: false,
    displayPrompt: false,
    displaySuccessMessage: false,
    promptMessage: '',
    successMessage: '',
    cancelText: '',
    acceptText: '',
    songsToAdd: [],
    parameters: {
        type: '',
        data: {}
    }
};

const promptSlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    showPlaylistPrompt: (state, action) => {
        state.parameters = {}
        state.displayPrompt = false
        state.displayPlaylistPrompt = true
        state.songsToAdd = action.payload
    },
    hidePlaylistPrompt: (state) => {
        state.displayPlaylistPrompt = state.displayPrompt = false
        state.parameters = {}
        state.songsToAdd = []
    },
    showPrompt: (state, action) => {
        state.parameters= action.payload.parameters
        state.songsToAdd = []
        state.displayPlaylistPrompt = false
        state.displayPrompt = true
        state.promptMessage = action.payload.promptMessage
        state.cancelText = action.payload.cancelText
        state.acceptText = action.payload.acceptText
    },
    hidePrompt: (state) => {
        state.displayPrompt = state.displayPlaylistPrompt = false
        state.parameters = {}
        state.songsToAdd = []
    },
    showSuccessMessage: (state, action) => {
        state.displaySuccessMessage = true
        state.successMessage = action.payload
    },
    hideSuccessMessage: (state, action) => {
        state.displaySuccessMessage = false
    }
  },
});

export const { showPlaylistPrompt, hidePlaylistPrompt, showPrompt, hidePrompt, showSuccessMessage, hideSuccessMessage } = promptSlice.actions;

export default promptSlice.reducer;
