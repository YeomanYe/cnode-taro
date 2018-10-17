import * as loginApi from './service';
import ReduxUtil,{cAction} from "../../utils/redux-helper";

export default {
  namespace: 'login',
  state: {

  },

  effects: {
    * queryEff({payload}, { call, put }) {

    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
