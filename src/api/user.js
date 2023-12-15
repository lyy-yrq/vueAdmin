import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function getRouterPermission() {
  return request({
    url: '/api/user/getRouterPermission',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
export function getList(data) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/api/user/addUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/api/user/deleteUser',
    method: 'post',
    data
  })
}



