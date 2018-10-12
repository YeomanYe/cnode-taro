import Taro, {Component} from '@tarojs/taro'
import {ScrollView, View} from "@tarojs/components";
import './index.scss';
import {connect} from "@tarojs/redux";
import {ComponentClass} from "react";
import {AtTabsPane, AtActivityIndicator} from "taro-ui";
import Topic, {IShowTopic} from "../../components/Topic";
import {cAction} from "../../utils/redux-helper";
import {AnyAction} from "redux";

type OwnProps = {
  datas: IShowTopic[],
  curIndex: number,
  tab:string,
  index: number
}

type PageStateProps = {
  height: number,
  add: (string,number) => AnyAction,
  query: (string) => AnyAction,
  isLoading: boolean
}

type IProps = OwnProps & PageStateProps

type IState = {}

interface TopicTabPanel {
  props: IProps
}

const mapStateToProps = ({sys: {windowHeight}, loading}) => ({height: windowHeight, isLoading: loading.effects['topics/queryEff']});
const mapDispatchToProps = (dispatch) => ({
  add:(tab,page) => dispatch(cAction('topics/addEff',{tab,page})),
  query:(tab) => dispatch(cAction('topics/queryEff',{tab})),
});
let page = 0;
@connect(mapStateToProps,mapDispatchToProps)
class TopicTabPanel extends Component {
  componentDidMount(){
    page = 1;
  }
  onLower = () => {
    console.log('onLower');
    console.log(this.props);
    let {tab,add} = this.props;
    add(tab,++page);
  };
  onUpper = () => {
    let {tab,query} = this.props;
    query(tab);
  };
  render() {
    let {datas, height, curIndex, index} = this.props;
    return (
      <AtTabsPane current={curIndex} index={index}>
        {this.props.isLoading ?
          <View style={`height:${height - 45}px`}>
            <AtActivityIndicator content='加载中' mode='center'/>
          </View> :
          <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            style={`height:${height - 45}px`}
            scrollTop={0}
            enableBackToTop={true}
            lowerThreshold={50}
            upperThreshold={50}
            onScrollToUpper={this.onUpper}
            onScrollToLower={this.onLower}
          >
            {datas.map(data => <Topic key={data.id} data={data}/>)}
          </ScrollView>}
      </AtTabsPane>
    )
  }
}

export default TopicTabPanel as ComponentClass<OwnProps, IState>
