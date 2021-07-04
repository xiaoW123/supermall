import Vue from "vue"
import Vuex from "vuex"

import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"



Vue.use(Vuex)
const store = new Vuex.Store({
  state: { //保持状态
    cartList: [] //购物车 数量
  },
  mutations,
  actions,
  getters
})

export default store