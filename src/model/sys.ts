export default {
  namespace: 'sys',
  state: {},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    * error({payload: e}) {
      console.error("error:", e);
    },
  },
};
