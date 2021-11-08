<template>
  <div id="daftar-tugas">
    <template v-if="daftarKuis">
      <vx-card
        v-for="item in daftarKuis"
        :key="item.id"
        :title="item.judul"
        class="mb-5"
      >
        <vs-row>
          <vs-col vs-type="flex" vs-align="center" vs-w="6">
            <small class="italic">Dibuat pada: {{ item.created_at }}</small>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
            <span
              >Terkumpul: <b>{{ item.terkumpul.length }}</b>
              <vs-button
                class="ml-4"
                size="small"
                @click="
                  $router.push({
                    name: 'list-kuis-masuk-dosen',
                    params: { kode: kode, id: item.id }
                  })"
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
      daftarKuis: "",
      showBuatTugas: false
    };
  },
  created() {
    this.fetchDetail();
    this.formTugas.kode = this.kode;
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("dosen/kuis/" + this.kode);
      this.daftarKuis = data.data.daftarKuis;
      console.log(this.daftarKuis);
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
