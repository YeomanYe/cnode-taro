import {formGet} from '../../utils/request-helper';


export function getTopics({page = 1,limit = 20,mdrender = false} = {page:1,limit:20,mdrender:false}) {
  return formGet('/topics',{page,limit,mdrender});
}
