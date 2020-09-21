import moment from 'moment';

function getSinceTime(time) {
  return `${moment(time).fromNow()}`;
}

export default getSinceTime;

