/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js"

export default {
  // addItem({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     axios.post("/api/data-list/products/", {item: item})
  //       .then((response) => {
  //         commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  fetchUsers({ commit }, tipe) {
    axios.get("/admin/users/" + tipe)
      .then((response) => {
        commit('SET_USERS', { tipe, users: response.data.users })
      })
  },
  addUser(_, data) {
    axios.post("/admin/create/" + data.tipe, data).then((response) => {
      if (response.data.message == "berhasil") {
        return "success"
      }
    })
  },
  deleteUser(_, data) {
    axios.delete('/admin/user/' + data.tipe + '/' + data.id)
  }
}
