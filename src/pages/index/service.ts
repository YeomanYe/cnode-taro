import {formGet} from '../../utils/request-helper';

export function getTopics() {
  return formGet('/topics');
}
