import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import rootReducer from "./reducers";

const ReduxStoreProvider = ({children}) => {
    const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
    const store = createStore(rootReducer, composedEnhancer)
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
export default ReduxStoreProvider;


