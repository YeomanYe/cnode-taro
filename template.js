/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

// 页面模版
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

type PageStateProps = {

}

type PageDispatchProps = {
  
}

type PageOwnProps = {
}

type PageState = {

}
type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ${titleCase(dirName)} {
  props: IProps;
  state:PageState;
}

@connect(({${dirName}}) => ({
  ...${dirName},
}))
export default class ${titleCase(dirName)} extends Component {
  config = {
    navigationBarTitleText: '${dirName}',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="${dirName}-page">
        ${dirName}
      </View>
    )
  }
}
export default ${titleCase(dirName)} as ComponentClass<PageOwnProps, PageState>
`;

// scss文件模版
const scssTep = `@import "../../styles/index";

.${dirName}-page {
  @include wh(100%, 100%);
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';
import ReduxUtil,{cAction} from "../../utils/redux-helper";

export default {
  namespace: '${dirName}',
  state: {

  },

  effects: {
    * queryEff({payload}, { call, put }) {
      
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
`;


// service页面模版
const serviceTep = `import {extractRes,formGet} from '../../utils/request-helper';

export async function query(param){
  let url = '';
  let resObj = await formGet(url,param);
  return extractRes(resObj);
}
`;



fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.tsx', indexTep);
fs.writeFileSync('index.scss', scssTep);
fs.writeFileSync('model.ts', modelTep);
fs.writeFileSync('service.ts', serviceTep);

console.log(`模版${dirName}已创建,请手动增加models`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
