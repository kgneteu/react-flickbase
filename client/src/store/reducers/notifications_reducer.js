import * as ActionType from "../actionTypes";

export default function notificationReducer(state={},action){
    switch(action.type){
        case ActionType.ERROR_GLOBAL:
            return { ...state, error: true, msg:action.payload }
        case ActionType.SUCCESS_GLOBAL:
            return { ...state, success: true, msg:action.payload }
        case ActionType.CLEAR_NOTIFICATION:
            return {}
        default:
            return state
    }
}


// const defaultState = {
//     notifications: [],
// };
//
// export default (state = defaultState, action) => {
//     switch (action.type) {
//         case ENQUEUE_SNACKBAR:
//             return {
//                 ...state,
//                 notifications: [
//                     ...state.notifications,
//                     {
//                         key: action.key,
//                         ...action.notification,
//                     },
//                 ],
//             };
//
//         case CLOSE_SNACKBAR:
//             return {
//                 ...state,
//                 notifications: state.notifications.map(notification => (
//                     (action.dismissAll || notification.key === action.key)
//                         ? { ...notification, dismissed: true }
//                         : { ...notification }
//                 )),
//             };
//
//         case REMOVE_SNACKBAR:
//             return {
//                 ...state,
//                 notifications: state.notifications.filter(
//                     notification => notification.key !== action.key,
//                 ),
//             };
//
//         default:
//             return state;
//     }
// };
