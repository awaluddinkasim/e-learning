<!-- =========================================================================================
    File Name: InputDefault.vue
    Description: Default input using vs-input
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Default" code-toggler>
    <span
      >The input is a functional part in an application, For implementing it we
      have the <code>vs-input</code> component.</span
    >

    <div class="demo-alignment">
      <vs-input class="inputx" placeholder="Placeholder" v-model="value1" />
      <vs-input
        disabled
        class="inputx"
        placeholder="Disabled"
        v-model="value2"
      />
    </div>

    <template slot="codeContainer">
      <template lang="html">
        <div class="centerx default-input">
          <vs-input class="inputx" placeholder="Placeholder" v-model="value1" />
          <vs-input
            disabled
            class="inputx"
            placeholder="Disabled"
            v-model="value2"
          />
        </div>
      </template>

      <script>
        export default {
          data() {
            return {
              value1: "",
              value2: ""
            };
          }
        };
      </script>
    </template>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: ""
    };
  }
};
</script>
