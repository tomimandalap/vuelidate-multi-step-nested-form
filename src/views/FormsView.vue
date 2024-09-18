<template>
  <main class="container">
    <HeaderButton 
      :stepsList="stepsList" 
      :currentStep="currentStep" 
      @onClickStep="(index) => onSetStep(index)"
    />

    <fieldset class="card">
      <form  orm @submit.prevent="onSubmit"> 
        <component :is="componentForm" :state="v$" />

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0 8px;">
          <button type="button" @click="resetForm">Reset</button>

          <div style="display: flex; align-items: center; gap: 0 8px;">
            <template v-if="showPrevStep">
              <button type="button" @click="gotoPrevStep">Prev</button>
            </template>

            <template v-if="showNextStep">
              <button type="button" @click="gotoNextStep">Next</button>
            </template>

            <template v-if="showSubmit">
              <button type="submit">Submit</button>
            </template>
          </div>
        </div>
      </form>
    </fieldset>


    <pre class="pre--code">{{ v$ }}</pre>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { required, email, numeric } from "@vuelidate/validators"
import { useSteps } from '@/composables/useSteps';
import HeaderButton from "@/components/HeaderButton.vue";

// Composable useSteps
const { 
  steps, 
  stepsList, 
  currentStep,
  showPrevStep,
  showNextStep,
  showSubmit,
  componentForm,
  onSetStep, 
  gotoPrevStep,
  gotoNextStep,
  gotoToFirstStepWithErrors 
} = useSteps()

interface FormData {
  name: string,
  email: string,
  experience: string,
  phone_number: string,
  address: string
}
const formData = ref<FormData>({
  name: '',
  email: '',
  experience: '',
  phone_number: '',
  address: ''
})

const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    experience: { required },
    phone_number: { required, numeric },
    address: { required },
    $validationGroups: {
      formPersonalData: ['name', 'email'],
      formEmploymentData: ['experience'],
      formAdditionalData: ['phone_number', 'address', 'FormAdditionalNested']
    }
  }
})

const $externalResults = ref({});
const v$ = useVuelidate(rules, formData as any, { $externalResults })

watch(
  () => v$.value.$validationGroups,
  (newVal) => {
    Object.keys(newVal).forEach((key: string) => {    
      steps.value[key].invalid = newVal[key].$error;
      steps.value[key].errorCount = newVal[key].$errors.length;
    });
  },
  { immediate: true, deep: true }
)

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    experience: '',
    phone_number: '',
    address: ''
  }
  v$.value.$reset()

  onSetStep(0)
}
const onSubmit = async () => {
  const validate = await v$.value.$validate()

  if (!validate) {
    // existing step when show error
    if (currentStep.value.invalid) return
    
    // goto component if invalid error true
    return await gotoToFirstStepWithErrors()
  }

  console.log('ini', formData.value);
}
</script>

<style lang="css" scoped>
.container {
  display: flex; 
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  min-height: 100vh;
}

.container .card {
  width: 100%;
  max-width: 500px;
  border-radius: 4px;
}

.container .pre--code {
  background-color: #e8e8e8; 
  border-radius: 4px;
  padding: 1rem;
  width: 100%;
  max-width: 500px;
}
</style>