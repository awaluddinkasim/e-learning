<template>
  <vx-card title="List Kuis">
    <vs-table max-items="3" pagination :data="daftarKuis">

      <template slot="thead">
        <vs-th>NIM</vs-th>
        <vs-th>Nama Lengkap</vs-th>
        <vs-th>Tanggal Upload</vs-th>
        <vs-th></vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].mahasiswa.username">
            {{ data[indextr].mahasiswa.username }}
          </vs-td>

          <vs-td :data="data[indextr].mahasiswa.name">
            {{ data[indextr].mahasiswa.name }}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{ data[indextr].created_at }}
          </vs-td>

          <vs-td :data="data[indextr].id" align="center">
            <!-- {{ data[indextr].id }} -->
            <vs-button size="small" @click="download(data[indextr].id)">Download Jawaban</vs-button>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import axios from '@/axios.js'

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      idKuis: this.$route.params.id,
      daftarKuis: "",
    }

  },
  methods: {
    download(id) {
      window.open(axios.defaults.baseURL + '/download/kuis-masuk/' + id)
    },
    async fetchKuis() {
      let kuis = await axios.get('dosen/kuis/' + this.kode + '/' + this.idKuis)
      this.daftarKuis = kuis.data.daftarKuis
      console.log(this.daftarKuis)
    },
  },
  created() {
    this.fetchKuis()
  }
}
</script>

<style>

</style>
