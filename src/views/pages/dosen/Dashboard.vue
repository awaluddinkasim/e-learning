<!-- =========================================================================================
    File Name: KnowledgeBase.vue
    Description: Knowledge Base Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="knowledge-base-page">
    <!-- JUMBOTRON -->
    <div class="knowledge-base-jumbotron">
      <div
        class="knowledge-base-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base"
      >
        <h1 class="mb-1 text-white">Selamat datang</h1>
        <p class="text-white">Selamat datang di Web E-Learning App.</p>
        <vs-button
          class="bg-primary-gradient mt-5"
          icon-pack="feather"
          icon="icon-plus"
          @click="toggleNewClass"
          >Buat Kelas</vs-button
        >
      </div>
    </div>

    <Modal v-if="showNewClass" @close="toggleNewClass">
      <h6>Form Kelas</h6>
      <vs-input label="Nama Kelas" placeholder="" v-model="formKelas.nama" size="large" class="w-full mt-6" />
      <vs-textarea v-model="formKelas.deskripsi" label="Deskripsi Kelas" class="w-full mt-6" />


      <div class="flex flex-wrap justify-end my-3">
        <vs-button @click="createClass">Buat</vs-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Modal from "../../../layouts/components/modal/Modal.vue";
import axios from '@/axios.js'

export default {
  data() {
    return {
      formKelas: {
        nama: "",
        deskripsi: "",
        dosen: null
      },
      showNewClass: false
    };
  },
  components: {
    Modal
  },
  computed: {
    ...mapGetters({
      dataDosen: "auth/userData"
    })
  },
  methods: {
    toggleNewClass() {
      this.showNewClass = !this.showNewClass;
    },
    async createClass() {
      this.$vs.loading();
      let kelas = await axios.post('dosen/kelas', this.formKelas);

      if (kelas.status == 200) {
        this.$vs.loading.close();
        this.$router.push('/dosen/kelas/' + kelas.data.kode)
      }
    }
  },
  created() {
    this.formKelas.dosen = this.dataDosen.id;
  }
};
</script>

<style lang="scss">
.knowledge-base-jumbotron-content {
  background-image: url("../../../assets/images/pages/knowledge-base-cover.jpg");
  background-size: cover;
}
</style>
