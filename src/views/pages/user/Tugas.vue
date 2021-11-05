<template>
  <div id="daftar-tugas">
    <template v-if="dataKelas">
      <vx-card
        v-for="item in dataKelas.daftar_tugas"
        :key="item.id"
        :title="item.nama_tugas"
        class="mb-5"
      >
        <p class="mb-3 px-3">
          {{ item.deskripsi }}
        </p>

        <vs-row>
          <vs-col vs-type="flex" vs-align="center" vs-w="6">
            <small class="italic">Ditugaskan pada: {{ item.created_at }}</small>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
            <vs-button @click="$router.push({ name: 'upload-tugas-user', params: { kode: kode, id: item.id } })">Upload Assignment</vs-button>
          </vs-col>
        </vs-row>
      </vx-card>
    </template>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      formTugas: {
        judul: "",
        deskripsi: "",
        kode: ""
      },
      dataKelas: "",
      showBuatTugas: false
    };
  },
  created() {
    this.fetchDetail();
    this.formTugas.kode = this.kode;
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("kelas/data/" + this.kode);
      this.dataKelas = data.data.detail;
      console.log(this.dataKelas);
    },
    toggleBuatTugas() {
      this.showBuatTugas = !this.showBuatTugas;
    },
  },
};
</script>
