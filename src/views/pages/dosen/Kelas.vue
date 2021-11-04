<template>
  <div id="kelas-page" v-if="daftarKelas">
    <div class="vx-row">
      <div
        class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
        v-for="item in daftarKelas"
        :key="item.kode"
        @click="$router.push('/dosen/kelas/'+item.kode).catch(() => {})"
      >
        <vx-card class="text-center cursor-pointer">
          <img
            :src="require('@/assets/images/class.svg')"
            alt="graphic"
            width="180"
            class="mx-auto mb-4"
          />
          <h4 class="mb-2">{{ item.nama_kelas.toUpperCase() }}</h4>
          <small>{{ item.deskripsi }}</small>
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
      dataDosen: 'auth/userData'
    })
  },
  created() {
    this.fetchKelas()
  },
  methods: {
    async fetchKelas() {
      let dataKelas = await axios.get('dosen/kelas/' + this.dataDosen.id)
      this.daftarKelas = dataKelas.data.daftarKelas
      console.log(this.daftarKelas)
    }
  },
};
</script>
