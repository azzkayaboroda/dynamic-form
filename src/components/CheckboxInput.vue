<template>
  <div>
    <input type="checkbox" :id="id" :checked="value" @change="updateValue" />
    <label :for="id">{{ caption }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: String,
    caption: String,
    value: Boolean
  },
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update', this.id, target.checked);
    },
  },
});
</script>
