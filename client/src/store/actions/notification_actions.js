import * as ActionType from "./../actionTypes"

/////// notification /////////////

export const errorGlobal = (msg) => ({
    type: ActionType.ERROR_GLOBAL,
    payload: msg
});

export const successGlobal = (msg) => ({
    type: ActionType.SUCCESS_GLOBAL,
    payload: msg
});

export const clearNotification = () => {
    // return {
    //      type: ActionType.CLEAR_NOTIFICATION,
    //  }
    return (dispatch) => {
        dispatch({
            type: ActionType.CLEAR_NOTIFICATION
        })
    }
}

//
// export const enqueueSnackbar = (notification) => {
//     const key = notification.options && notification.options.key;
//
//     return {
//         type: ENQUEUE_SNACKBAR,
//         notification: {
//             ...notification,
//             key: key || new Date().getTime() + Math.random(),
//         },
//     };
// };
//
// export const closeSnackbar = key => ({
//     type: CLOSE_SNACKBAR,
//     dismissAll: !key, // dismiss all if no key has been defined
//     key,
// });
//
// export const removeSnackbar = key => ({
//     type: REMOVE_SNACKBAR,
//     key,
// });
