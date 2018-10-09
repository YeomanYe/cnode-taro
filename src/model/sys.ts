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

export interface ISystemInfo {
  brand:string   //手机品牌
  model:string   //手机型号
  system:string  //操作系统版本
  pixelRatio:number  //设备像素比
  screenWidth:number //屏幕宽度
  screenHeight:number    //屏幕高度
  windowWidth:number //可使用窗口宽度
  windowHeight:number    //可使用窗口高度
  version:string //微信版本号
  statusBarHeight:number //状态栏的高度
  platform:string    //客户端平台
  language:string    //微信设置的语言
  fontSizeSetting:number //用户字体大小设置。以“我-设置-通用:-字体大小”中的设置为准，单位：px
  SDKVersion:string  //客户端基础库版本
  batteryLevel?:number
  benchmarkLevel?:number
}
