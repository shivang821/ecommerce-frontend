import axios from "axios";

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/login', { email, password }, config);
        dispatch({ type: "LOGIN_SUCCESS", payload: data })
    } catch (error) {

        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message })
    }
}

export const register = (userData) => async(dispatch) => {
    try {
        dispatch({ type: "REGISTER_REQUEST" });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post('/register', userData, config);

        dispatch({ type: "REGISTER_SUCCESS", payload: data })
    } catch (error) {

        dispatch({ type: "REGISTER_FAIL", payload: error.response.data.message })
    }
}


// load user

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST" });
        const { data } = await axios.get('/me');
        dispatch({ type: "LOAD_USER_SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAIL", payload: null })
    }
}


export const logout = () => async(dispatch) => {
    try {
        await axios.get('/logout');
        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message })
    }
}

export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch({ type: "UPDATE_PROFILE_REQUEST" });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.patch('/me/update', userData, config);

        dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.success })
    } catch (error) {

        dispatch({ type: "UPDATE_PROFILE_FAIL", payload: error.response.data.message })
    }
}
export const updatePassword = (passwords) => async(dispatch) => {
    try {
        dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.patch('/password/update', passwords, config);

        dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.success })
    } catch (error) {

        dispatch({ type: "UPDATE_PASSWORD_FAIL", payload: error.response.data.message })
    }
}


export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({ type: "FORGOT_PASSWORD_REQUEST" });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/password/forgot', email, config);
        dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message })
    } catch (error) {

        dispatch({ type: "FORGOT_PASSWORD_FAIL", payload: error.response.data.message })
    }
}
export const resetPassword = (token, passwords) => async(dispatch) => {
    try {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.patch(`/password/reset/${token}`, passwords, config);
        dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.success })
    } catch (error) {

        dispatch({ type: "RESET_PASSWORD_FAIL", payload: error.response.data.message })
    }
}

export const clearErrors = (dispatch) => {
    dispatch({ type: "CLEAR_ERROR" })
}