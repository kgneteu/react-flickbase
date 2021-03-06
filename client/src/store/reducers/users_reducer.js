import * as ActionType from "./../actionTypes"

const DEFAULT_USER_STATE = {
    data: {
        _id: null,
        email: null,
        password: null,
        firstname: null,
        lastname: null,
        age: null,
        role: null,
    },
    auth: null,
}
export default function userReducer(state = DEFAULT_USER_STATE, action) {
    switch (action.type) {
        case ActionType.USER_AUTH:
            return {
                ...state,
                data: {...state.data, ...action.payload.data},
                auth: action.payload.auth,
            }
        case ActionType.USER_DEAUTH:
            return {...state, ...DEFAULT_USER_STATE};
        case ActionType.CHANGE_USER_EMAIL:
            return { ...state, data:{ ...state.data, email: action.payload}}
        case ActionType.UPDATE_USER_PROFILE:
            return { ...state, data:{...action.payload}}
        default:
            return state
    }
}
