import * as ActionType from "./../actionTypes"

export default function articleReducer(state = {}, action) {

    switch (action.type) {
        case ActionType.GET_ARTICLES:
            return {...state, articles: action.payload}
        case ActionType.GET_ARTICLE:
            return {...state, article: action.payload}
        case ActionType.CLEAR_CURRENT_ARTICLE:
            return {...state, article: null}
        case ActionType.ADD_ARTICLE:
            return {...state, lastAdded: action.payload, success:true }
        case ActionType.GET_ADMIN_ARTICLES:
            return {...state, adminArticles: action.payload }
        case ActionType.UPDATE_ARTICLE_STATUS:
            return { ...state,
                adminArticles:{
                    ...state.adminArticles,
                    docs: action.payload
                }
            }
        default:
            return state
    }
}
