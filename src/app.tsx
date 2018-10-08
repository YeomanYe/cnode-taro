import Taro, {Component, Config} from '@tarojs/taro'
import '@tarojs/async-await'
import {Provider} from '@tarojs/redux'
import Index from './pages/index';
import dva from './dva';
import models from './model';

import './app.scss'
import {cAction} from "./utils/redux-helper";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(cAction("sys/error", e));
  },
});

const store = dvaApp.getStore();
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/collect/index',
      'pages/msg/index',
      'pages/user/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#1296db',
      navigationBarTitleText: 'CNode',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#1296db",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./asset/images/home.png",
        selectedIconPath: "./asset/images/home_focus.png"
      }, {
        pagePath: "pages/collect/index",
        text: "收藏",
        iconPath: "./asset/images/collect.png",
        selectedIconPath: "./asset/images/collect_focus.png"
      }, {
          pagePath: "pages/msg/index",
          text: "消息",
          iconPath: "./asset/images/msg.png",
          selectedIconPath: "./asset/images/msg_focus.png"
        }, {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./asset/images/user.png",
          selectedIconPath: "./asset/images/user_focus.png"
        }]
    }
  };

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentCatchError() {
  }

  render() {
    return (
      <Provider store={store}>
         <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
