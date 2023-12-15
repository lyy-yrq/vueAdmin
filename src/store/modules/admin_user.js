import { getRouterPermission } from "@/api/user";
const state = {
  user_routers_permission: []
}

const mutations = {
  SET_USER_ROUTERS: (state,path_permission) => {
    state.user_routers_permission = path_permission;
  }
  
}

const actions = {
  setUserRoutersPermission({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRouterPermission(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USER_ROUTERS',data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
