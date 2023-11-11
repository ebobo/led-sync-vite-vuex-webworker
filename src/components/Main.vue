<template>
  <div>
    <button @click="addLED">+ LED</button>
    <span class="button-space"></span>
    <!-- Space between buttons -->
    <button @click="removeLED">- LED</button>
    <p class="read-the-docs">Click buttons to add or remove LED</p>
    <input type="checkbox" id="flash-toggle" v-model="isFlashingEnabled" />
    <label for="flash-toggle"> Flash LEDs</label>
    <p class="led-count">{{ leds.length }}</p>
    <!-- LED Count Label -->
    <!-- Display number of LEDs -->

    <div class="led-container">
      <Led v-for="led in leds" :key="led.id" :isOn="isFlashing" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Led from './Led.vue';

interface LedItem {
  id: number;
}

export default defineComponent({
  name: 'FlashingLEDs',
  components: {
    Led,
  },
  setup() {
    const store = useStore();
    const leds = ref<LedItem[]>([]);
    const isFlashingEnabled = ref(true); // New state for toggle switch

    // Initialize Worker
    store.dispatch('flash/initializeWorker');

    const addLED = () => {
      leds.value.push({ id: Date.now() });
    };

    const removeLED = () => {
      leds.value.pop();
    };

    const isFlashing = computed(() => store.state.flash.isFlashing);

    watch(isFlashingEnabled, (newValue) => {
      store.dispatch('flash/toggleFlashing', newValue); // Stop flashing LEDs
    });

    onBeforeUnmount(() => {
      store.dispatch('flash/cleanupWorker');
    });

    return { leds, isFlashing, isFlashingEnabled, addLED, removeLED };
  },
});
</script>

<style scoped>
.read-the-docs {
  font-family: 'Roboto', sans-serif;
  color: #888;
}
.button-space {
  display: inline-block;
  width: 10px; /* Adjust as needed for spacing */
}
.button-space {
  margin-bottom: 10px;
}

.led-container {
  display: flex; /* Use Flexbox for layout */
  gap: 12px; /* Space between LEDs */
  margin-bottom: 15px; /* Add some margin below the LEDs */
}

.led-count {
  font-family: 'Roboto', sans-serif; /* Using Roboto font */
  font-size: 22px; /* Adjust the font size as needed */
  font-weight: 500; /* Making the font bold */
  color: #828181; /* Set the color */
  margin-bottom: 10px;
}
</style>
