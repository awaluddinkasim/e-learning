<template>
  <vx-card title="List Kuis">
    <vs-table max-items="3" pagination :data="daftarKuis">

      <template slot="thead">
        <vs-th>NIM</vs-th>
        <vs-th>Nama Lengkap</vs-th>
        <vs-th>Tanggal Upload</vs-th>
        <vs-th>Nilai</vs-th>
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

          <vs-td :data="data[indextr].id">
            <vs-button size="small" v-if="!data[indextr].nilai" @click="nilai(data[indextr].id)">Beri Nilai</vs-button>
            <span v-else>{{ data[indextr].nilai.nilai }}</span>
          </vs-td>

          <vs-td :data="data[indextr].id" align="center">
            <!-- {{ data[indextr].id }} -->
            <vs-button size="small" @click="download(data[indextr].id)">Download Jawaban</vs-button>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>
    <Modal v-if="showNilaiForm" @close="nilai">
      <h6>Form Nilai</h6>
      <vs-input label="Masukkan nilai" placeholder="" v-model="dataNilai.nilai" size="large" class="w-full mt-6" />

      <div class="flex flex-wrap justify-end my-3">
        <vs-button @click="assignNilai">Simpan</vs-button>
      </div>
    </Modal>
  </vx-card>
</template>

<script>
import Modal from "@/layouts/components/modal/Modal.vue";
import axios from '@/axios.js'

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      idKuis: this.$route.params.id,
      daftarKuis: "",
      dataNilai: {
        id_kuis: null,
        nilai: null
      },
      showNilaiForm: false
    }

  },
  components: {
    Modal
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
    nilai(id) {
      this.dataNilai.id_kuis = id
      this.showNilaiForm = !this.showNilaiForm
    },
    async assignNilai() {
      this.$vs.loading();
      let nilai = await axios.post('dosen/kuis-masuk/nilai', this.dataNilai)
      if (nilai.status == 200) {
        this.fetchKuis();
        this.nilai(null);
        this.dataNilai.nilai = null;
        this.$vs.loading.close();
      }
    }
  },
  created() {
    this.fetchKuis()
  }
}
</script>

<style>

</style>
