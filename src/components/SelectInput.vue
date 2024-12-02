<template>
  <div>
    <label :for="id">{{ caption }}</label>
    <select :id="id" :value="value" @change="updateValue">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: String,
    caption: String,
    value: String,
    options: Array
  },
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('update', this.id, target.value);
    },
  },
});
</script>
