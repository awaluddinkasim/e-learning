<template>
  <div id="daftar-tugas">
    <template v-if="dataKelas">
      <vx-card
        v-for="item in dataKelas.daftar_tugas"
        :key="item.id"
        :title="item.nama_tugas"
        class="mb-5"
      >
        <vs-row>
          <vs-col vs-type="flex" vs-align="center" vs-w="6">
            <small class="italic">Ditugaskan pada: {{ item.created_at }}</small>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
            <span
              >Tugas terkumpul: <b>{{ item.tugas_masuk.length }}</b>
              <vs-button
                class="ml-4"
                size="small"
                @click="
                  $router.push({
                    name: 'list-tugas-masuk-dosen',
                    params: { kode: kode, id: item.id }
                  })
                "
                >Detail</vs-button
              ></span
            >
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
      let data = await axios.get("dosen/kelas/data/" + this.kode);
      this.dataKelas = data.data.detail;
      console.log(this.dataKelas);
    },
    toggleBuatTugas() {
      this.showBuatTugas = !this.showBuatTugas;
    },
    async uploadTugas() {
      this.$vs.loading();
      let tugas = await axios.post("dosen/tugas", this.formTugas);
      if (tugas.status == 200) {
        this.fetchDetail();
        this.toggleBuatTugas();
        this.$vs.loading.close();
      }
    }
  }
};
</script>
