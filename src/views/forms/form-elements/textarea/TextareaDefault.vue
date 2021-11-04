<!-- =========================================================================================
    File Name: TextareaDefault.vue
    Description: Rendering textarea
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Default" code-toggler>
    <span
      >To add a Textarea we have the component <code>vs-textarea</code></span
    >

    <div class="mt-5">
      <vs-textarea v-model="textarea" />
    </div>

    <template slot="codeContainer">
      <template>
        <div>
          <vs-textarea v-model="textarea" />
        </div>
      </template>
    </template>
  </vx-card>
</template>

<script>
export default {
  data: () => ({
    textarea: ""
  })
};
</script>
