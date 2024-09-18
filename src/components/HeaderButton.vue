<script setup lang="ts">
import type { PropType } from "vue";
import type { ItemStep } from "@/types/steps_type"

defineProps({
  stepsList: {
    type: Array as PropType<ItemStep[]>,
    required: true
  },
  currentStep: {
    type: Object as PropType<ItemStep>,
    required: true
  },
})

const emit = defineEmits<{
  (e: 'onClickStep', value: number): void
}>()
</script>

<template>
  <nav class="steps-nav">
    <button
      v-for="(step, index) in stepsList"
      :key="step.id"
      :data-active-step="step.id === currentStep.id"
      :data-error-step="!!step.invalid"
      class="steps-nav__item"
      @click="emit('onClickStep', index)"
    >
      {{ step.label }} {{  step.invalid ? "❌" : '' }}
    </button>
  </nav>
</template>

<style lang="css" scoped>
nav.steps-nav {
  display: inline-flex;
  background: #f8f8f8;
  padding: 8px;
  gap: 8px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.steps-nav__item {
  border: 0;
  color: teal;
  border-radius: 4px;
  padding: 4px 8px;
}

.steps-nav__item[data-active-step="true"] {
  background-color: teal;
  color: white;
}
.steps-nav__item[data-error-step="true"] {
  background-color: rgb(240, 204, 204);
  color: black;
  display: flex;
}
</style>