import * as ActionType from "./../actionTypes"

export default function siteReducer(state={},action){
    switch(action.type){
        case ActionType.SITE_LAYOUT:
            return { ...state, layout: action.payload }
        case ActionType.SITE_TEST: {
            console.log('stest')
            return {...state, test: action.payload}
        }
        default:
            return state
    }
}
