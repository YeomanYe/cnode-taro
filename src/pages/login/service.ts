import {formPost} from '../../utils/request-helper';


export async function login(accesstoken) {
  let url = '/accesstoken';
  let resObj = await formPost(url,{accesstoken});
  return resObj;
}
