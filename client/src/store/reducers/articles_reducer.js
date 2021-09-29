import {GET_ARTICLES} from '../actionTypes';

export default function articleReducer(state = {}, action) {

    switch (action.type) {
        case GET_ARTICLES:
            return {...state, articles: action.payload}
        default:
            return state
    }
}
