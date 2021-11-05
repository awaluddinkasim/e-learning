<template>
  <div id="daftar-materi">
    <template v-if="daftarKuis">
      <vx-card
        v-for="item in daftarKuis"
        :key="item.id"
        :title="item.judul"
        class="mb-5"
      >
        <p class="mb-3 px-3">
          {{ item.instruksi }}
        </p>

        <vs-row>
          <vs-col vs-type="flex" vs-w="6" vs-align="center">
            <small class="italic">Dibuat pada: {{ item.created_at }}</small>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
            <vs-button class="mr-1">Download Soal</vs-button>
            <vs-button>Upload Jawaban</vs-button>
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
        instruksi: "",
        file: "",
      },
      kode: this.$route.params.kode,
      daftarKuis: "",
      showUploadMateri: false
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("kuis/" + this.kode);
      this.daftarKuis = data.data.daftarKuis;
      console.log(data.data);
    },
    toggleBuatKuis() {
      this.showUploadMateri = !this.showUploadMateri;
    },
    handleFile(event) {
      this.formMateri.file = event.target.files[0];
    }
  }
};
</script>
