import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AnyAction} from "redux";
import {AtTabs} from 'taro-ui';


import {cAction} from "../../utils/redux-helper";
import DateUtil from "../../utils/date-helper";
import {IShowTopic} from "../../components/Topic";
import {ITopic} from "./model";
import './index.scss'
import TopicTabPanel from "./TopicTabPanel";

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
  topics: ITopic[],
  width: number,
  height: number,
  isLoad:any,
}

type PageDispatchProps = {
  query: (object?) => AnyAction
}

type PageOwnProps = {}

type PageState = {
  curTab: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}


@connect(({topics,loading, sys: {windowWidth, windowHeight}}) => ({
  topics, width: windowWidth, height: windowHeight,isLoad:loading.effects['topics/queryEff']
}), dispatch => ({
  query: (param) => dispatch(cAction('topics/queryEff', param))
}))
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


  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.query();
  }

  onTabClick = (curTab) => {
    let {query} = this.props;
    query({tab:tabList[curTab].tab});
    this.setState({curTab});
  };

  state = {
    curTab: 0
  };

  render() {
    const {curTab} = this.state;
    const {topics} = this.props;
    let showTopics: IShowTopic[] = resolveTopics(topics);
    return (
      <View className='index'>
        <AtTabs
          current={curTab}
          swipeable
          onClick={this.onTabClick}
          tabList={tabList}>
          {tabList.map((data,i) => <TopicTabPanel index={i} curIndex={curTab} key={data.tab} datas={showTopics} tab={data.tab}/>)}
        </AtTabs>
      </View>
    )
  }
}
let tabList = [{title: '全部',tab:''}, {title: '精华',tab:'good'}, {title: '分享',tab:'share'}, {title: '问答',tab:'ask'}, {title: '招聘',tab:'job'}, {title: '其他',tab:'dev'}];


function resolveTopics(topics: ITopic[]): IShowTopic[] {
  return topics.map(topic => {
    let {last_reply_at, create_at, tab, good, top} = topic;
    let tab_text, tab_text_class;
    if (top) {
      tab_text = '置顶';
      tab_text_class = 'blue-bg';
    } else if (good) {
      tab_text = '精华';
      tab_text_class = 'yellow-bg';
    } else {
      switch (tab) {
        default:
        case 'dev':
          tab_text = '测试';
          tab_text_class = 'red-bg';
          break;
        case 'ask':
          tab_text = '问答';
          tab_text_class = 'green-bg';
          break;
        case 'share':
          tab_text = '分享';
          tab_text_class = 'purple-bg';
          break;
        case 'job':
          tab_text = '招聘';
          tab_text_class = 'brown-bg';
          break;
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
