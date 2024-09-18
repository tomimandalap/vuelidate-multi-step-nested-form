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
    v-model="v$.phone_number.$model" 
    label="Phone number" 
    name="phone_number" 
    placeholder="Ex: 628xxxxxxx" 
    :error="v$.phone_number.$errors[0]?.$message"
  />

  <BaseInput 
    v-model="v$.address.$model" 
    label="Address" 
    name="address" 
    placeholder="Ex: Soekarno-Hatta Street No. 89 Block B" 
    :error="v$.address.$errors[0]?.$message"
  />
</template>