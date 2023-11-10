<template>
  <div class="led" :class="{ 'is-on': isOn }"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Led',
  props: {
    isOn: Boolean,
  },
});
</script>

<style scoped>
.led {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #808080; /* Default color (grey) */
  transition: background-color 0.5s, transform 0.5s;
}

.led.is-on {
  background-color: #add8e6; /* Flashed color (sky blue) */
  transform: scale(1.2); /* Scale up when on */
}
</style>
