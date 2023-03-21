import { createReducer } from "@reduxjs/toolkit";

const userState = {
    isAuthenticate: false,
    loading: true,
    user: null,
    error: null
}
export const userReducer = createReducer(userState, {
    LOGIN_REQUEST: (state, action) => {
        state.loading = true;
        state.isAuthenticate = false
    },
    REGISTER_REQUEST: (state, action) => {
        state.loading = true;
        state.isAuthenticate = false
    },
    LOAD_USER_REQUEST: (state, action) => {
        state.loading = true;
        state.isAuthenticate = false
    },
    LOGIN_SUCCESS: (state, action) => {
        state.user = {...action.payload.user };
        state.loading = false;
        state.isAuthenticate = true
    },
    REGISTER_SUCCESS: (state, action) => {
        state.user = {...action.payload.user };
        state.loading = false;
        state.isAuthenticate = true
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.user = {...action.payload.user };
        state.loading = false;
        state.isAuthenticate = true
    },
    LOGIN_FAIL: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false;
        state.error = action.payload
    },
    REGISTER_FAIL: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false;
        state.error = action.payload
    },
    LOAD_USER_FAIL: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false;
        state.error = action.payload
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticate = false
    },
    LOGOUT_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    CLEAR_ERROR: (state, action) => {
        state.error = null
    }
})

const profileState = {
    isUpdated: null,
    loading: false,
    error: null
}

export const profileReducer = createReducer(profileState, {
    UPDATE_PROFILE_REQUEST: (state, action) => {
        state.loading = true
    },
    UPDATE_PASSWORD_REQUEST: (state, action) => {
        state.loading = true
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    UPDATE_PROFILE_RESET: (state, action) => {
        state.isUpdated = false;
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
        state.isUpdated = false;
    },
    CLEAR_ERROR: (state, action) => {
        state.error = null
    }
})

const forgotState = {
    message: "",
    loading: false,
    error: null,
    success: false
}

export const forgotPasswordReducer = createReducer(forgotState, {
    FORGOT_PASSWORD_REQUEST: (state, action) => {
        state.loading = true
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
        state.loading = true
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.success = action.payload;
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    RESET_PASSWORD_FAIL: (state, action) => {
        state.error = action.payload;
        state.loading = false
    },
    FORGOT_PASSWORD_RESET: (state, action) => {
        state.message = null;
        state.loading = false
    },
    RESET_PASSWORD_RESET: (state, action) => {
        state.success = false;
        state.loading = false
    },
    CLEAR_ERROR: (state, action) => {
        state.error = null
    }
})