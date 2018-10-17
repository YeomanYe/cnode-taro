import {extractRes,formGet} from '../../utils/request-helper';

export async function query(param){
  let url = '';
  let resObj = await formGet(url,param);
  return extractRes(resObj);
}
