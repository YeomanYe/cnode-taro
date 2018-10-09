import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({collect}) => ({
  ...collect,
}))
export default class Collect extends Component {
  config = {
    navigationBarTitleText: '收藏',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="collect-page">
        collect
      </View>
    )
  }
}
