import {combineReducers, createStore, compose} from "redux";
import {filesReducer} from "./filesReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const reducers = combineReducers({
    files: filesReducer,

});

export type ReducersType = ReturnType<typeof reducers>

const ReduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, ReduxDevTool())

export default store