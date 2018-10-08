import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'


import './index.scss'
import {Topic} from "./model";
import {cAction} from "../../utils/redux-helper";
import {AnyAction} from "redux";
import DateUtil from "../../utils/date-helper";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  topics: Topic[]
}

type PageDispatchProps = {
  query: () => AnyAction
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({topics}) => ({
  topics
}), dispatch => ({query: () => dispatch(cAction('topics/queryEff'))}))
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidMount() {
    console.log('props', this.props);
    this.props.query();
  }

  render() {
    const {topics} = this.props;
    console.log('topics', topics);
    const topic = resolveTopics(topics)[0];
    return (
      <View className='index'>
        <View className="topic">
          <View className="head">
            <View className={"badge " + topic.tab_text_class}>
              <Text>{topic.tab_text}</Text>
            </View>
            <Text className="title">{topic.title}</Text>
          </View>
          <View
            className="content">
            <View className="left">
              <Image className="avatar" src={topic.author.avatar_url}/>
              <View className="info">
                <Text>{topic.author.loginname}</Text>
                <Text>{topic.create_at_text}</Text>
              </View>
            </View>
            <View
              className="right">
              <View className='wrapCount'>
                <Text className="reply_count">{topic.reply_count}</Text>
                <Text>/</Text>
                <Text>{topic.visit_count}</Text>
              </View>
              <Text>{topic.last_reply_at_text}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function resolveTopics(topics: Topic[]): any[] {
  return topics.map(topic => {
    let {last_reply_at, create_at,tab,good,top} = topic;
    let tab_text,tab_text_class;
    if(top){
      tab_text = '置顶';
      tab_text_class = 'blue';
    }else if(good){
      tab_text = '精华';
      tab_text_class = 'orange';
    }else{
      switch (tab){
        default:
        case 'dev':tab_text = '测试';tab_text_class = 'red';break;
        case 'ask':tab_text = '问答'; tab_text_class = 'green';break;
        case 'share':tab_text = '分享';tab_text_class = 'purple';break;
        case 'job':tab_text = '招聘';tab_text_class = 'brown';break;
      }
    }
    return {
      ...topic,
      tab_text,
      tab_text_class,
      create_at_text: DateUtil.format(new Date(create_at), 'yyyy-MM-dd'),
      last_reply_at_text: DateUtil.format(new Date(last_reply_at), 'yyyy-MM-dd')
    }
  });
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
