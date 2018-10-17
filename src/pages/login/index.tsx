import Taro, {Component} from '@tarojs/taro';
import {Image, Input, Text, View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import './index.scss';
import {ComponentClass} from "react";

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  selected:string
}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Login {
  props: IProps;
  state:PageState;
}
@connect(({login}) => ({
  ...login,
}))
class Login extends Component {
  config = {
    navigationBarTitleText: 'login',
  };

  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        selected:''
      };
      this.userFocus = this.createOnFocus('user');
      this.passFocus = this.createOnFocus('pass');
    }

  componentDidMount = () => {

  };
  userFocus;
  passFocus;

  onFocus = (ev) => {
    console.log(ev)
  };

  createOnFocus = (selected) => {
    return () => {
      this.setState({selected})
    }
  };

  render() {
    let {selected} = this.state;

    return (
      <View className="login-page">
        {/* 头部标题 */}
        <View className="header">
          <Text className="title">CNode</Text>
          <View className="close-btn">
            <Image className={'close-btn-icon'} src={require('../../asset/images/home.png')}/>
          </View>
        </View>
        {/*表单*/}
        <View className="content">
          <View className={`form-input ${selected === 'user' ? 'selected' : ''}`}>
            <Input onFocus={this.userFocus} className={'input'} placeholder={'用户名'} type='text' />
          </View>
          <View className={`form-input ${selected === 'pass' ? 'selected' : ''}`}>
            <Input onFocus={this.passFocus} className={'input'} placeholder={'密码'} password={true} />
          </View>
        </View>
        {/*按钮*/}
        <View className={'submit-btn'}>
          <Text className={'btn-text'}>登录</Text>
        </View>
      </View>
    )
  }
}

export default Login as ComponentClass<PageOwnProps, PageState>
