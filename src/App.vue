<template>
  <div id="app">
    <DynamicForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DynamicForm from './components/DynamicForm.vue';

export default Vue.extend({
  components: {
    DynamicForm,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}
</style>
