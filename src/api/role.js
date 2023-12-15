import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/api/menus/routes',
    method: 'get'
  })
}

export function getRoles(data) {
  return request({
    url: '/api/roles/list',
    method: 'get',
    params:data
  })
}

export function addRole(data) {
  return request({
    url: '/api/roles/add_role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/api/roles/update`,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/roles/delete/${id}`,
    method: 'delete'
  })
}

export function getOptions(data){
  return request({
    url: '/api/roles/getOptions',
    method: 'post',
    data
  })
}