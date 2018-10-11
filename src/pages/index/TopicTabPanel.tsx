import Taro, {Component} from '@tarojs/taro'
import {ScrollView} from "@tarojs/components";
import './index.scss';
import {connect} from "@tarojs/redux";
import {ComponentClass} from "react";
import {AtTabsPane} from "taro-ui";
import Topic, {IShowTopic} from "../../components/Topic";

type OwnProps ={
  datas: IShowTopic[],
  add: () => void
}

type PageStateProps = {
  height:number
}

type IProps = OwnProps & PageStateProps

type IState = {}

interface TopicTabPanel {
  props:IProps
}

@connect(({sys:{windowHeight}})=>({height:windowHeight}))
class TopicTabPanel extends Component{
  render(){
    let {datas,height,add} = this.props;
    return (
      <AtTabsPane>
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={`height:${height - 45}px`}
          enableBackToTop={true}
          lowerThreshold={50}
          upperThreshold={50}
          onScrollToLower={add}
        >
          {datas.map(data => <Topic key={data.id} data={data}/>)}
        </ScrollView>
      </AtTabsPane>
    )
  }
}
export default TopicTabPanel as ComponentClass<OwnProps, IState>
