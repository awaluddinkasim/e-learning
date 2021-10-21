/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_USERS(state, { tipe, users }) {
    switch (tipe) {
      case 'dosen':
        state.userDosen = users
        break;

      case 'user':
        state.userMahasiswa = users
        break;
    }
  },
}
