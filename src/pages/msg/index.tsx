import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({msg}) => ({
  ...msg,
}))
export default class Msg extends Component {
  config = {
    navigationBarTitleText: 'msg',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="msg-page">
        msg
      </View>
    )
  }
}
