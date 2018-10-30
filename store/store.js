import { createStore, applyMiddleware, compose } from 'redux';
import { Platform } from 'react-native';
import thunk from 'redux-thunk'
import {rootReducer} from '../reducers/index';
//import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools, devToolsEnhancer } from 'remote-redux-devtools';
//import devTools from 'remote-redux-devtools';

export function prepareStore(initial) {
    /*const enhancer = compose(
        applyMiddleware(ReduxThunk),
        devToolsEnhancer({ realtime: true }),
        devTools({
          name: Platform.OS,
          hostname: 'localhost',
          port: 5678
        })
      );*/

    return createStore(
        rootReducer,
        initial,
        composeWithDevTools(
            applyMiddleware(thunk),
          )
        //enhancer
    );

}
