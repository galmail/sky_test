import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

export function reducer(state, action = {}) {
  
  // console.log('Message Dispatched', action.type);

  switch (action.type){
    case 'TEMPERATURES_LOADING_FULFILLED':
      const tempObj = action.payload;
      let temperatures = [];
      if (tempObj) {
        temperatures = Object.keys(tempObj).map(t => ({
          date: new Date(parseInt(t, 10) * 1000),
          value: tempObj[t]
        }));
      }
      return { ...state, temperatures };
    default:
      return state;
  }

}

export const store = createStore(reducer, {}, applyMiddleware(
  promiseMiddleware()
));