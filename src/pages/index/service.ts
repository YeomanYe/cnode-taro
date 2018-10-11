import {extractRes, formGet} from '../../utils/request-helper';


export async function getTopics({page = 1,limit = 20,mdrender = false,tab = ''} = {page:1,limit:20,mdrender:false,tab:''}) {
  let res = await formGet('/topics',{tab,page,limit,mdrender});
  return extractRes(res,[]);
}
