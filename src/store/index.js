import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
// middlewares
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";

// Import custom components
import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  {},
  compose(
    applyMiddleware(thunkMiddleware),

    //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : function(f) {
          return f;
        }
  )
);

export default store;
