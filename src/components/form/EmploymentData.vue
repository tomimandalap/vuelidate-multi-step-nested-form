<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";

import type { BaseValidation } from "@vuelidate/core"
import { computed, type PropType } from "vue";

const props = defineProps({
  state: {
    type: Object as PropType<Record<string, BaseValidation> | BaseValidation>,
    required: true
  }
})

const v$ = computed(() => props.state)
</script>

<template>
  <BaseInput 
    v-model="v$.experience.$model" 
    label="Experience" 
    name="experience" 
    placeholder="Ex: Elon Musk" 
    :error="v$.experience.$errors[0]?.$message"
  />
</template>