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
            <div class="knowledge-base-jumbotron-content lg:p-32 md:p-24 sm:p-16 p-8 rounded-lg mb-base">
                <h1 class="mb-1 text-white">Selamat datang</h1>
                <p class="text-white">Silahkan masukkan kode kelas untuk bergabung dengan kelas Anda.</p>
                <vs-button class="bg-primary-gradient mt-5" icon-pack="feather" icon="icon-plus" @click="toggleJoin">Gabung Kelas</vs-button>
            </div>
        </div>

        <Modal v-if="showJoinClass" @close="toggleJoin">
            <h6>Masukkan Kode Kelas</h6>

            <vs-input
                data-vv-validate-on="keyup"
                type="text"
                name="kode"
                icon-no-border
                icon="icon icon-lock"
                icon-pack="feather"
                label-placeholder="Kode Kelas"
                v-model="formJoin.kodeKelas"
                class="w-full mt-6" />
            <vs-alert icon="warning" active="true" color="danger" class="my-5" v-if="isError">
                <span>Gagal menambahkan kelas.</span>
            </vs-alert>

            <div class="flex flex-wrap justify-end my-3">
              <vs-button :disabled="!validateForm" @click="joinClass">Gabung</vs-button>
            </div>
        </Modal>
    </div>
</template>

<script>

import axios from '@/axios.js'
import Modal from '../../../layouts/components/modal/Modal.vue'
import { mapGetters } from 'vuex'

export default{
    data() {
        return {
            formJoin: {
              kodeKelas: '',
              idUser: '',
            },
            showJoinClass: false,
            isError: false
        }
    },
    created() {
      this.formJoin.idUser = this.dataUser.id
    },
    components: {
      Modal
    },
    computed: {
      ...mapGetters({
        dataUser: 'auth/userData'
      }),
      validateForm() {
        if (this.formJoin.kodeKelas != '' && this.formJoin.kodeKelas.length == 7) {
          return true
        }
        return false
      },
    },
    methods: {
      toggleJoin() {
        this.showJoinClass = !this.showJoinClass
      },
      joinClass() {
        this.$vs.loading()
        axios.post('enroll', this.formJoin).then(() => {
          this.$router.push('/user/kelas')
        }).catch(() => {
          this.isError = true
        }).finally(() => {
            this.$vs.loading.close()
        })
      }
    }
}
</script>

<style lang="scss">
.knowledge-base-jumbotron-content {
    background-image: url('../../../assets/images/pages/knowledge-base-cover.jpg');
    background-size: cover;
}
</style>
