import request from '@/utils/request'


export function getList(data) {
  return request({
    url: '/api/site/list',
    method: 'post',
    data
  })
}

export function verify(data) {
  return request({
    url: '/api/site/verify',
    method: 'post',
    data
  })
}


export function getDocument(data) {
  return request({
    url: '/api/document/list',
    method: 'post',
    data
  })
}

export function addDocument(data) {
  return request({
    url: '/api/document/add',
    method: 'post',
    data
  })
}

export function updateDocument(data) {
  return request({
    url: '/api/document/update',
    method: 'post',
    data
  })
}

export function delDocument(data) {
  return request({
    url: '/api/document/del',
    method: 'post',
    data
  })
}


