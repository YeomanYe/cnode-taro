/**
 * 绑定表单输入创造器工厂
 * @param self
 * @returns {function(*=): Function}
 */
export function changeHandlerFactory(self) {
  return function (...names) {
    return e => {
      let val = e;
      if(e && e.target) val = e.target.value;
      let last = self.state; //取倒二个对象
      for (let i = 0, len = names.length - 1; i < len; i++) {
        last = last[names[i]];
      }
      last[names[names.length - 1]] = val;
      self.setState(self.state);
    }
  }
}
