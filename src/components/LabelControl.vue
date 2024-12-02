<template>
  <label :for="target">{{ caption }}</label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    target: String,
    caption: String,
  }
});
</script>
