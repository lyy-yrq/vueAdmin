import { asyncRoutes, constantRoutes } from '@/router'
import store from '..'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterAsyncRoutesByPath(routes,p_path="") {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermissionByPath(tmp,p_path)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByPath(tmp.children,tmp.path)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
 function hasPermissionByPath(route,p_path="") {
  if (route.path ) {
    var is_true = false;
    var check_path = route.path;
    // if(p_path){
    //   check_path = p_path+"/"+route.path;
    // }
    var paths = store.getters.user_routers_permission;
    paths.forEach(function(item,index){
        if(check_path == item){
          is_true = true;
          return;
        }
    })
    return is_true;
  } else {
    return false
  }
}



const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('s_admin')) {
        accessedRoutes = asyncRoutes || []
        //accessedRoutes = filterAsyncRoutesByPath(asyncRoutes, store.getters.user_routers_permission)
      } else {
        console.log(roles);
        accessedRoutes = filterAsyncRoutesByPath(asyncRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
