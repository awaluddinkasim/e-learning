<template>
  <div id="kelas-page">
    <!-- KNOWLEDGE BASE CARDS  -->
    <div class="vx-row">
      <div
        class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
        v-for="item in daftarKelas"
        :key="item.kelas.kode"
        @click="$router.push('/user/kelas/'+item.kelas.kode).catch(() => {})"
      >
        <vx-card class="text-center cursor-pointer">
          <img
            :src="require('@/assets/images/class.svg')"
            alt="graphic"
            width="180"
            class="mx-auto mb-4"
          />
          <h4 class="mb-2">{{ item.kelas.nama_kelas.toUpperCase() }}</h4>
          <small>{{ item.kelas.deskripsi }}</small>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from '@/axios.js'

export default {
  data() {
    return {
      daftarKelas: null
    }
  },
  computed: {
    ...mapGetters({
      dataUser: 'auth/userData'
    })
  },
  created() {
    this.fetchKelas()
  },
  methods: {
    async fetchKelas() {
      let dataKelas = await axios.get('/kelas/' + this.dataUser.id)
      this.daftarKelas = dataKelas.data.daftarKelas
    }
  },
};
</script>
