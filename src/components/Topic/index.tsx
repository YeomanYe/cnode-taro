import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from "@tarojs/components";
import {ITopic} from '../../pages/index/model';
import './index.scss';
import {connect} from "@tarojs/redux";
import {ComponentClass} from "react";

export interface IShowTopic extends ITopic{
  tab_text_class:string,
  tab_text:string,
  create_at_text:string,
  last_reply_at_text:string
}

type OwnProps ={
  data: IShowTopic,
}

type PageStateProps = {
  width:number
}

type IProps = OwnProps & PageStateProps

type IState = {}

interface Topic {
  props:IProps
}

@connect(({sys:{windowWidth}})=>({width:windowWidth}))
class Topic extends Component{
  render(){
    let {data,width} = this.props;
    console.log('topic width',width);
    return (
      <View className="topic">
        <View className="head">
          <View className={"badge " + data.tab_text_class}>
            <Text className="badge-text">{data.tab_text}</Text>
          </View>
          <Text className="title" style={{width:width - 80 + 'px'}}>{data.title}</Text>
        </View>
        <View
          className="content">
          <Image className="avatar" src={data.author.avatar_url}/>
          <View className="info">
            <View className="first-line">
              <Text>{data.author.loginname}</Text>
              <View>
                <Text className="reply-count">{data.reply_count}</Text>
                <Text className="separate-count">/</Text>
                <Text>{data.visit_count}</Text>
              </View>
            </View>
            <View className="second-line">
              <Text>{data.create_at_text}</Text>
              <Text>{data.last_reply_at_text}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Topic as ComponentClass<OwnProps, IState>
