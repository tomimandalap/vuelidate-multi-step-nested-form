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
    v-model="v$.name.$model" 
    label="Name" 
    name="name" 
    placeholder="Ex: Elon Musk" 
    :error="v$.name.$errors[0]?.$message"
  />

  <BaseInput 
    v-model="v$.email.$model" 
    label="Email" 
    name="email" 
    placeholder="example@mail.com" 
    :error="v$.email.$errors[0]?.$message"
  />
</template>