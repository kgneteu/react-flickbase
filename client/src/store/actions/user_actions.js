import axios from "axios";
import * as ActionType from "./../actionTypes"
import {errorGlobal, successGlobal} from "./notification_actions";
import {getAuthHeader, getTokenCookie, removeTokenCookie} from "../../utils/tools";

export const registerUser = (userData) => {
    return async dispatch=>{
        try{
            const {email, password} = userData;
            const user = (await axios.post('/api/users/register', {email, password}));
            dispatch(authUser({data: user.data, auth: true}))
            dispatch(successGlobal('Welcome! Check your email and validate your account.'))
        } catch (e) {
            if (e.response.data.message) {
                dispatch(errorGlobal(e.response.data.message))
            }
            else {
                dispatch(errorGlobal('Ooops'))
            }
        }
    }
}

export const loginUser = (userData) => {
    return async dispatch=>{
        try{
            const {email, password} = userData;
            const user = (await axios.post('/api/users/login', {email, password}));
            dispatch(authUser({data: user.data, auth: true}))
            dispatch(successGlobal('Welcome !'));
        } catch (e) {
            if (e.response.data.message) {
                dispatch(errorGlobal(e.response.data.message))
            }
            else {
                dispatch(errorGlobal('Ooops'))
            }
        }
    }
}

export const authUser = (user) => {
    return {
        type: ActionType.USER_AUTH,
        payload: user,
    }
}

export const deauthUser = () => {
    return {
        type: ActionType.USER_DEAUTH
    }
}

export const isAuthUser = () => {
    return async dispatch => {
        try {
            if (!getTokenCookie()){
                return dispatch(authUser({data: {}, auth: false}))
            }
            const user = await axios.get('/api/users/is_auth', getAuthHeader());
            dispatch(authUser({data: user.data, auth: true}))
        } catch (e) {
            dispatch(authUser({data: {}, auth: false}))
        }
    }
}

export const signOutUser = () => {
   return async dispatch => {
       try {
          removeTokenCookie();
          dispatch(deauthUser())
          dispatch(successGlobal('You are logged out!'));
       } catch (e) {
           dispatch(errorGlobal(e.message));
       }
   }
}

export const updateUserProfileSuccess = (userdata) => ({
    type: ActionType.UPDATE_USER_PROFILE,
    payload: userdata
})

export const updateUserProfile = (data) =>{
    return async(dispatch,getState)=>{
        try{
            const profile = await axios.patch(`/api/users/profile`,data,getAuthHeader());
            const userData = {
                ...getState().user.data,
                ...profile.data
            }
            dispatch(updateUserProfileSuccess(userData));
            dispatch(successGlobal('Profile updated'))
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
        }
    }
}

export const changeUserEmailSuccess = (data) => ({
    type: ActionType.CHANGE_USER_EMAIL,
    payload: data
})

export const changeEmail = (data) =>{
    return async(dispatch)=>{
        try{
            await axios.patch(`/api/users/update_email`,{
                email: data.email,
                newemail: data.newemail
            },getAuthHeader());

            dispatch(changeUserEmailSuccess(data.newemail))
            dispatch(successGlobal('Good job!!'))
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
        }
    }
}
