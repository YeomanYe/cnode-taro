import {ComponentClass} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {ScrollView, View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AnyAction} from "redux";


import {cAction} from "../../utils/redux-helper";
import DateUtil from "../../utils/date-helper";
import Topic, {IShowTopic} from "../../components/Topic";
import {ITopic} from "./model";
import './index.scss'

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
  width:number,
  height:number,
}

type PageDispatchProps = {
  query: (object?) => AnyAction
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

let page = 0;

@connect(({topics,sys:{windowWidth,windowHeight}}) => ({
  topics,width:windowWidth, height:windowHeight
}), dispatch => ({query: (param)=> dispatch(cAction('topics/queryEff',param))}))
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

  componentWillMount(){
    page = 1;
    this.props.query();
  }

  queryByPage = () => {
    const {query} = this.props;
    console.log('page',page);
    query({page:++page})
  };

  render() {
    const {topics,height} = this.props;
    console.log('topics', topics);
    let showTopics:IShowTopic[] = resolveTopics(topics);
    return (
      <View className='index'>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={`height:${height}px`}
          enableBackToTop={true}
          lowerThreshold={50}
          upperThreshold={50}
          onScrollToLower={this.queryByPage}
          >
          {showTopics.map(data => <Topic key={data.id} data={data}/>)}
        </ScrollView>
      </View>
    )
  }
}

function resolveTopics(topics: ITopic[]): IShowTopic[] {
  return topics.map(topic => {
    let {last_reply_at, create_at, tab, good, top} = topic;
    let tab_text, tab_text_class;
    if (top) {
      tab_text = '置顶';
      tab_text_class = 'blue';
    } else if (good) {
      tab_text = '精华';
      tab_text_class = 'orange';
    } else {
      switch (tab) {
        default:
        case 'dev':
          tab_text = '测试';
          tab_text_class = 'red';
          break;
        case 'ask':
          tab_text = '问答';
          tab_text_class = 'green';
          break;
        case 'share':
          tab_text = '分享';
          tab_text_class = 'purple';
          break;
        case 'job':
          tab_text = '招聘';
          tab_text_class = 'brown';
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
