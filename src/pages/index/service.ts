import {formGet} from '../../utils/request-helper';


export async function getTopics({page = 1,limit = 20,mdrender = false,tab = ''} = {page:1,limit:20,mdrender:false,tab:''}) {
  let res = await formGet('/topics',{tab,page,limit,mdrender});
  if(res && res.success){
    return res.data;
  }
  return [];
}
