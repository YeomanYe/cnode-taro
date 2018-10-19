import Taro, {Component} from '@tarojs/taro';
import {Image, Input, Text, View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import './index.scss';
import {ComponentClass} from "react";
import {changeHandlerFactory} from "../../utils/PageUtil";
import {cAction} from "../../utils/redux-helper";
import {AnyAction} from "redux";
import {AtActivityIndicator} from "taro-ui";

type PageStateProps = {}

type PageDispatchProps = {
  login: (string) => AnyAction,
  loading: boolean
}

type PageOwnProps = {}

type PageState = {
  accessToken: string
}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Tokenlogin {
  props: IProps;
  state: PageState;
}

@connect(({loading}) => ({loading: loading.effects['user/loginEff']}), (dispatch) => ({
  login: (token) => dispatch(cAction('user/loginEff', token))
}))
class Tokenlogin extends Component {
  config = {
    navigationBarTitleText: 'Access Token',
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      accessToken: '6f79f072-7297-47de-9f10-9d84f16b7f56'
    };
    let createBind = changeHandlerFactory(this);
    this.onChange = createBind('accessToken');
  }

  onChange;

  componentDidMount = () => {

  };

  login = () => {
    let {accessToken} = this.state;
    let {login} = this.props;
    login(accessToken);
  };

  render() {
    let {accessToken} = this.state;
    let {loading} = this.props;
    return (
      <View className="login-page">
        {loading ? <AtActivityIndicator content='加载中' mode='center'/> :
          (
            <View>
              {/* 头部标题 */}
              <View className="header">
                <Text className="title">CNode</Text>
                <View className="close-btn">
                  <Image className={'close-btn-icon'} src={require('../../asset/images/close.png')}/>
                </View>
              </View>
              {/*表单*/}
              <View className="content">
                <View className={`form-input selected`}>
                  <Input onInput={this.onChange} value={accessToken} className={'input'} placeholder={'Access Token'}
                         type='text'/>
                </View>
              </View>
              {/*按钮*/}
              <View onClick={this.login} className={'footer'}>
                <Text className={'btn-text'}>登录</Text>
              </View>
            </View>
          )}
      </View>
    )
  }
}

export default Tokenlogin as ComponentClass<PageOwnProps, PageState>
