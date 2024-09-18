<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, url } from '@vuelidate/validators'
import BaseInput from "@/components/BaseInput.vue"

interface FormAdditionalNested {
  github: string,
  linkedin: string
}
const form = ref<FormAdditionalNested>({
  github: '',
  linkedin: ''
})

const rules = {
  github: { required, url },
  linkedin: { required, url }
}

const v$ = useVuelidate(rules, form, { $registerAs: 'FormAdditionalNested'});
</script>

<template>
  <fieldset style="padding: 0 2rem 0 1rem; margin: 1rem 0;">
    <legend>
      Form Additional
    </legend>

    <BaseInput
      v-model="form.github"
      label="Github" 
      name="github" 
      placeholder="https://github.com/username" 
      :error="v$.github.$errors[0]?.$message"
      />
      
      <BaseInput
      v-model="form.linkedin"
      label="Linkedin" 
      name="linkedin" 
      placeholder="https://www.linkedin.com/in/username" 
      :error="v$.linkedin.$errors[0]?.$message"
    />
  </fieldset>
</template>