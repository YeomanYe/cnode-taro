import {httpReq} from '../../utils/request-helper';

export const demo = (data) => {
  return httpReq({
    url: '路径',
    method: 'POST',
    data,
  });
};
