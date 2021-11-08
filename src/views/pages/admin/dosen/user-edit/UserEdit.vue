<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">
    <vx-card title="Edit Dosen">
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Username" v-model="form.username" />
          </div>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <div class="vx-col w-full">
            <vs-select
              v-model="form.prodi"
              class="w-full"
              label="Program Studi"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in daftarProdi"
                class="w-full"
              />
            </vs-select>
          </div>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Nama Lengkap" v-model="form.name" />
          </div>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select
            v-model="form.jk"
            class="w-full"
            label="Jenis Kelamin"
          >
            <vs-select-item value="L" text="Laki-laki" />
            <vs-select-item value="P" text="Perempuan" />
          </vs-select>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Password" type="password" v-model="form.password" />
            <small>* Kosongkan jika tidak ingin mengganti</small>
          </div>
        </div>
      </div>
      <div class="vx-row">
    <div class="vx-col w-full">
      <vs-button class="mr-3 mt-5" @click="simpanData">Simpan</vs-button>
    </div>
  </div>
    </vx-card>
  </div>
</template>

<script>
import axios from '@/axios.js'

export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        username: "",
        name: "",
        password: "",
        prodi: "",
        jk: ""
      },
      daftarProdi: [
        // teknik
        {
          index: 0,
          text: "Teknik Informatika",
          value: "Teknik Informatika"
        },
        {
          index: 1,
          text: "Teknik Mesin",
          value: "Teknik Mesin"
        },
        {
          index: 2,
          text: "Teknik Industri",
          value: "Teknik Industri"
        },
        {
          index: 3,
          text: "Teknik Elektro",
          value: "Teknik Elektro"
        },
        {
          index: 4,
          text: "Teknik Sipil",
          value: "Teknik Sipil"
        }
      ],
    };
  },
  methods: {
    async fetchUser() {
      let user = await axios.get('admin/user/dosen/' + this.id)
      console.log(user.data)
      if (user.data.user) {
        this.form.username = user.data.user.username
        this.form.name = user.data.user.name
        this.form.prodi = user.data.user.prodi
        this.form.jk = user.data.user.jk
      }
    },
    async simpanData() {
      let update = await axios.put('admin/user/dosen/' + this.id, this.form)
      if (update.status == 200) {
        this.$router.push({ name: 'admin-daftar-dosen' })
      }
    }
  },
  created() {
    this.fetchUser()
  }
};
</script>
