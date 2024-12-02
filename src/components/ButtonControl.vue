<template>
  <button @click="handleClick" :type="type">{{ caption }}</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    id: String,
        caption: String,
    type: String
  },
  methods: {
    handleClick() {
      if (this.caption === 'OK') {
          this.$emit('update', 'submit');
        console.log("test1");
        
      } else if (this.caption === 'Очистить') {
          this.$emit('reset');
         console.log("test12");
      }
    },
  },
});
</script>
