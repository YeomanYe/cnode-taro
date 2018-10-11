import * as indexApi from './service';
import {cAction, default as ReduxUtil} from "../../utils/redux-helper";
export default {
  namespace: 'topics',
  state: [],
  effects: {
    * queryEff({payload}, { call, put }) {
      const data = yield call(indexApi.getTopics, payload);
      yield put(cAction('query',data));
    },
    * addEff({payload}, { call, put }) {
      const data = yield call(indexApi.getTopics, payload);
      yield put(cAction('add',data));
    },
  },
  reducers: {
    ...ReduxUtil.createArrReducer()
  },

};

export interface IAuthor {
  avatar_url:string;
  loginname:string;
}

export interface ITopic {
  author:IAuthor;
  author_id:string;
  content:string;
  create_at:string;
  good:boolean;
  id:string;
  last_reply_at:string;
  tab:string;
  title:string;
  top:boolean;
  reply_count:number;
  visit_count:number; //访问人数
}
