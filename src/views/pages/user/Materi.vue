<template>
  <div id="daftar-materi">
    <template v-if="daftarMateri">
    <vx-card
      v-for="item in daftarMateri"
      :key="item.id"
      :title="item.judul"
      class="mb-5"
    >
      <p class="mb-3 px-3">
        {{ item.deskripsi }}
      </p>

      <vs-row>
        <vs-col vs-type="flex" vs-w="6" vs-align="center">
          <small class="italic">Dibuat pada: {{ item.created_at }}</small>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
          <vs-button @click="download(item.id)">Download Materi</vs-button>
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
      formMateri: {
        judul: "",
        deskripsi: "",
        file: ""
      },
      kode: this.$route.params.kode,
      daftarMateri: "",
      showUploadMateri: false
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    download(id) {
      window.open(axios.defaults.baseURL + '/download/materi/' + id)
    },
    async fetchDetail() {
      let data = await axios.get("materi/" + this.kode);
      this.daftarMateri = data.data.daftarMateri;
      console.log(data.data);
    },
    toggleUploadMateri() {
      this.showUploadMateri = !this.showUploadMateri;
    },
    handleFile(event) {
      this.formMateri.file = event.target.files[0]
    },
  },
};
</script>
