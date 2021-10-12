import {combineReducers} from "redux";
import articleReducer from "./articles_reducer";
import userReducer from "./users_reducer";
import notificationReducer from "./notifications_reducer";
import siteReducer from "./site_reducer";
import categoriesReducer from "./categories_reducer";

const rootReducer = combineReducers({
    articles: articleReducer,
    user: userReducer,
    notifications: notificationReducer,
    site: siteReducer,
    categories: categoriesReducer,
});
export default rootReducer;
