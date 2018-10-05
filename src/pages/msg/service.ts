import {httpReq} from '../../utils/data-helper';

export const demo = (data) => {
  return httpReq({
    url: '路径',
    method: 'POST',
    data,
  });
};
