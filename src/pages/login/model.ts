import ReduxUtil,{cAction} from "../../utils/redux-helper";
import {login} from "./service";

export default {
  namespace: 'user',
  state: {

  },

  effects: {
    * loginEff({payload}, { call, put }) {
      let resObj = yield call(login,payload);
      if(resObj.success){
        yield put(cAction('save',{name:resObj.loginname,avatar:resObj.avatar_url,id:resObj.id}));
      }
    },
  },

  reducers: {
    ...ReduxUtil.createObjReducer()
  },

};
