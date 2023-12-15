import request from '@/utils/request'


export function timeToTimestamp(data) {
  return request({
    url: '/api/tools/timeToTimestamp',
    method: 'post',
    data
  })
}

export function timestampToTime(data) {
  return request({
    url: '/api/tools/timestampToTime',
    method: 'post',
    data
  })
}
