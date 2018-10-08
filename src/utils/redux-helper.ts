import {AnyAction} from "redux";

export function cAction(type, payload?:any):AnyAction {
  return {type, payload};
}

export default class ReduxUtil {
  static createArrReducer(id = 'id') {
    return {
      query(state, {payload}) {
        return [...payload];
      },
      add(state, {payload}) {
        return [...state, ...payload];
      },
      update(state, {payload}) {
        return state.map(item => item[id] === payload[id] ? payload : item)
      },
      del(state,{payload}){
        let ids = payload[id];
        return ids instanceof Array ? state.filter(item => ids.indexOf(item[id]) < 0) : state.filter(item => item[id] !== ids);
      }
    }
  }

  static createObjReducer() {
    return {
      save(state, {payload}) {
        return {...state, ...payload};
      }
    }
  }
}
