<script setup lang="ts">
import type { PropType } from 'vue';

  const vModel = defineModel({
    type: String as PropType<unknown>,
    required: true
  })

  defineProps({
    label: {
      type: String,
      default: 'Label'
    },
    name: {
      type: String,
      default: 'name'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    error: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="base__input" :data-invalid="!!error">
    <label class="label" :for="name">{{ label }}</label>
    <input 
      v-model="vModel"
      type="text"
      :id="name"
      :name="name"
      :placeholder="placeholder"
      class="input"
    />

    <p class="error-massage" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<style lang="css" scoped>
.base__input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  width: 100%;
  max-width: 484px;
}

.base__input[data-invalid="true"] {
  input {
    border: 1px solid tomato;

    &:focus {
      outline: 1px solid tomato;
    }
  }
}

.base__input .label {
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 1rem;
}

.base__input .input {
  padding: 4px 8px;
  width: 100%;
  margin: 0;
  border-radius: 4px;
}

.base__input .error-massage {
  margin: 4px 0;
  color: tomato;
  font-size: 0.875rem;
}
</style>