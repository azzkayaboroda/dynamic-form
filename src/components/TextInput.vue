<template>
  <div>
    <input
      :id="id"
      :type="'text'"
      :value="value"
      @input="updateValue"
      :required="required"
      :tabindex="tabindex"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: String,
    caption: String,
    value: String, // Принимаем начальное значение
        required: Boolean,
    tabindex: Number
  },
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update', this.id, target.value); // Сообщаем об обновлении значения
    },
  },
});
</script>
