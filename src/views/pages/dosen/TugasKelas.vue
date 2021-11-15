<template>
  <div id="daftar-tugas">
    <vs-button
      icon-pack="feather"
      icon="icon-plus"
      class="my-3"
      @click="toggleBuatTugas"
      >Buat Tugas</vs-button
    >

    <Modal v-if="showBuatTugas" @close="toggleBuatTugas">
      <h6>Form Tugas</h6>
      <vs-input
        label="Judul"
        placeholder=""
        v-model="formTugas.judul"
        size="large"
        class="w-full mt-6"
      />
      <vs-textarea
        v-model="formTugas.deskripsi"
        label="Deskripsi"
        class="w-full mt-6"
      />
      <div class="flex flex-wrap justify-end my-3">
        <vs-button @click="uploadTugas">Buat</vs-button>
      </div>
    </Modal>

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
            <span
              >Tugas terkumpul: <b>{{ item.tugas_masuk.length }}</b></span
            >
          </vs-col>
        </vs-row>
      </vx-card>
    </template>
  </div>
</template>

<script>
import Modal from "../../../layouts/components/modal/Modal.vue";
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
  },
  components: {
    Modal
  }
};
</script>
