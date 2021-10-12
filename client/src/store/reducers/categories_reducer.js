import * as ActionType from "./../actionTypes"

export default function categoriesReducer(state = [], action) {
    switch (action.type) {
        case ActionType.GET_CATEGORIES:
            return {...state, categories: action.payload}
        case ActionType.ADD_CATEGORY:
            return {...state, categories: action.payload}
        default:
            return state
    }
}
