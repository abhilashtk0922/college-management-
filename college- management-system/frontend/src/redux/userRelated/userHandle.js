import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    // Ensure role is logged and fallback to avoid undefined
    console.log("Received Role:", role);
    if (!role) {
        console.error("Role is undefined. Please ensure it is passed correctly.");
        dispatch(authError({ message: "Role is undefined." }));
        return;
    }

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/${role}Login`;  // Fixed template literal
    console.log("Constructed API URL:", apiUrl);

    try {
        const result = await axios.post(apiUrl, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        console.error("Login error:", error.message);
        dispatch(authError({ message: error.message, code: error.code }));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/${role}Reg`;  // Fixed template literal
        console.log("API URL:", apiUrl);

        const result = await axios.post(apiUrl, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else if (result.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        console.error("Registration error:", error.message);
        dispatch(authError({ message: error.message, code: error.code }));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/${address}/${id}`;  // Fixed template literal
        console.log("API URL:", apiUrl);

        const result = await axios.get(apiUrl);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        console.error("Get user details error:", error.message);
        dispatch(getError({ message: error.message, code: error.code }));
    }
};

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/${address}/${id}`;  // Fixed template literal
        console.log("API URL:", apiUrl);

        const result = await axios.put(apiUrl, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        console.error("Update user error:", error.message);
        dispatch(getError({ message: error.message, code: error.code }));
    }
};

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const apiUrl = `${process.env.REACT_APP_BASE_URL}/${address}Create`;  // Fixed template literal
        console.log("API URL:", apiUrl);

        const result = await axios.post(apiUrl, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        console.error("Add stuff error:", error.message);
        dispatch(authError({ message: error.message, code: error.code }));
    }
};
