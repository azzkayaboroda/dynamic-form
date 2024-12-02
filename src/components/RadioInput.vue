<template>
  <div>
    <label>{{ caption }}</label>
    <div v-for="option in options" :key="option.value">
      <input
        type="radio"
        :id="`${id}-${option.value}`"
        :value="option.value"
        :checked="value === option.value"
        @change="updateValue"
      />
      <label :for="`${id}-${option.value}`">{{ option.label }}</label>
    </div>
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
      const target = event.target as HTMLInputElement;
      this.$emit('update', this.id, target.value);
    },
  },
});
</script>
