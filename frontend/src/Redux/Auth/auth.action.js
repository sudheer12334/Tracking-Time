import axios from 'axios';
import { AUTH_LOGIN_ERROR, AUTH_LOGIN_LOADING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_SIGNUP_ERROR, AUTH_SIGNUP_LOADING, AUTH_SIGNUP_SUCCESS } from './auth.types';
const {REACT_APP_URI}=process.env;
console.log(REACT_APP_URI);
const api = REACT_APP_URI;

export const singupAPI = (creds) => async (dispatch) => {
    dispatch({ type: AUTH_SIGNUP_LOADING });
    try {
        console.log("entered signup API");
        let res = await axios.post(`${api}/user/signup`, creds);
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: res.data });
        return res.data;
    }
    catch (e) {
        dispatch({ type: AUTH_SIGNUP_ERROR })
        return e;
    }
}
export const loginAPI = (creds) => async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_LOADING });
    try {
        let res = await axios.post(`${api}/user/login`, creds);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data });
        return res.data;
    }
    catch (e) {
        dispatch({ type: AUTH_LOGIN_ERROR })
        return e;
    }
}

export const logoutAPI = () => ({ type: AUTH_LOGOUT })