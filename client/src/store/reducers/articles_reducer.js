import * as ActionType from "./../actionTypes"

export default function articleReducer(state = {}, action) {

    switch (action.type) {
        case ActionType.GET_ARTICLES:
            return {...state, articles: action.payload}
        default:
            return state
    }
}
