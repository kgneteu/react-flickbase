import * as ActionType from "./../actionTypes"


export const siteLayout = (layout) => ({
    type: ActionType.SITE_LAYOUT,
    payload: layout
})

export const appLayout = (layout) => {
    return (dispatch) => {
        dispatch(siteLayout(layout))
    };
}

export const siteTest = (value) => {
    return dispatch => {
        setTimeout(()=>dispatch({type: ActionType.SITE_TEST, payload: value}),10000)
        //
    }
}
