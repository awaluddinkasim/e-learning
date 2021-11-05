
<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <vs-button
        class="bg-primary-gradient mb-5 ml-auto"
        icon-pack="feather"
        icon="icon-plus"
        @click="toggleAddUser"
        >Tambah Mahasiswa</vs-button
      >
      <Modal v-if="showAddUser" @close="toggleAddUser">
        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-input
              label="Username"
              v-model="addForm.username"
              class="w-full"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-input
              label="Nama Lengkap"
              v-model="addForm.name"
              class="w-full"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full mt-5">
            <vs-input
              label="Password"
              v-model="addForm.password"
              class="w-full"
              type="password"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-select
              v-model="addForm.jk"
              class="w-full select-large mt-5"
              label="Jenis Kelamin"
            >
              <vs-select-item value="L" text="Laki-laki" />
              <vs-select-item value="P" text="Perempuan" />
            </vs-select>
          </div>
        </div>
        <vs-button class="bg-primary mt-5 ml-auto" @click="add"
          >Tambah</vs-button
        >
      </Modal>

      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
                -
                {{
                  usersData.length - currentPage * paginationPageSize > 0
                    ? currentPage * paginationPageSize
                    : usersData.length
                }}
                of {{ usersData.length }}</span
              >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input
          class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <!-- <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button> -->
      </div>

      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="usersData"
        rowSelection="single"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>

      <vs-pagination :total="totalPages" :max="7" v-model="currentPage" />
    </div>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
import vSelect from "vue-select";

import Modal from "../../../../../layouts/components/modal/Modal.vue";

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

// Store Module
// import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'

// Cell Renderer
import CellRendererActions from "./cell-renderer/CellRendererActions.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AgGridVue,
    vSelect,

    Modal,

    FormWizard,
    TabContent,

    // Cell Renderer
    CellRendererActions
  },
  data() {
    return {
      addForm: {
        tipe: "user",
        username: "",
        name: "",
        password: "",
        jk: ""
      },

      searchQuery: "",
      showAddUser: false,

      // AgGrid
      gridApi: null,
      gridOptions: {},
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: "Username",
          field: "username",
          width: 250,
          filter: true
        },
        {
          headerName: "Nama Lengkap",
          field: "name",
          filter: true,
          width: 350
        },
        {
          headerName: "L/P",
          field: "jk",
          filter: true,
          width: 150
        },
        {
          headerName: "",
          cellRendererFramework: 'CellRendererActions',
        },
      ],

      // Cell Renderer Components
      components: {
        CellRendererActions
      }
    };
  },
  watch: {
    roleFilter(obj) {
      this.setColumnFilter("role", obj.value);
    },
    statusFilter(obj) {
      this.setColumnFilter("status", obj.value);
    },
    isVerifiedFilter(obj) {
      let val =
        obj.value === "all" ? "all" : obj.value == "yes" ? "true" : "false";
      this.setColumnFilter("is_verified", val);
    },
    departmentFilter(obj) {
      this.setColumnFilter("department", obj.value);
    },
  },
  computed: {
    ...mapGetters({
      users: "userManagement/getMahasiswa"
    }),
    usersData() {
      return this.users;
    },
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 10;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      }
    }
  },
  methods: {
    ...mapActions({
      addUser: "userManagement/addUser",
      fetchUsers: "userManagement/fetchUsers"
    }),
    add() {
      this.$vs.loading();
      this.addUser(this.addForm).then(() => {
        this.toggleAddUser();
        setTimeout(() => {
          this.fetchUsers("user").then(() => {
            this.$vs.loading.close();
          });
        }, 1000);
      });
    },
    toggleAddUser() {
      this.showAddUser = !this.showAddUser;
    },
    setColumnFilter(column, val) {
      const filter = this.gridApi.getFilterInstance(column);
      let modelObj = null;

      if (val !== "all") {
        modelObj = { type: "equals", filter: val };
      }

      filter.setModel(modelObj);
      this.gridApi.onFilterChanged();
    },
    resetColFilters() {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null);
      this.gridApi.onFilterChanged();

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = {
        label: "All",
        value: "all"
      };

      this.$refs.filterCard.removeRefreshAnimation();
    },
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(
        ".ag-header-container"
      );
      header.style.left =
        "-" + String(Number(header.style.transform.slice(11, -3)) + 9) + "px";
    }
  },
  created() {
    // if(!moduleUserManagement.isRegistered) {
    //   this.$store.registerModule('userManagement', moduleUserManagement)
    //   moduleUserManagement.isRegistered = true
    // }
    this.fetchUsers("user");
  }
};
</script>

<style lang="scss">
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}
</style>
