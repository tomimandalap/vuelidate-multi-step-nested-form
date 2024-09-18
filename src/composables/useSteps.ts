import { computed, ref, nextTick } from "vue"
import type { ItemStep } from "@/types/steps_type"

import FormPersonalData from "@/components/form/PersonalData.vue"
import EmploymentData from "@/components/form/EmploymentData.vue"
import AdditionalData from "@/components/form/AdditionalData.vue"

export function useSteps() {
  const steps = ref<Record<string, ItemStep>>({
    formPersonalData: {
      id: 'formPersonalData',
      label: 'Personal Data',
      invalid: false,
      errorCount: 0
    },
    formEmploymentData: {
      id: 'formEmploymentData',
      label: 'Employment Data',
      invalid: false,
      errorCount: 0
    },
    formAdditionalData: {
      id: 'formAdditionalData',
      label: 'Additional Data',
      invalid: false,
      errorCount: 0
    },
  })

  const stepsList = computed<ItemStep[]>(() => Object.values(steps.value))

  const currentIndex = ref<number>(0)
  const currentStep = computed<ItemStep>(() => stepsList.value[currentIndex.value])
  const showPrevStep = computed(() => stepsList.value[currentIndex.value - 1]);
  const showNextStep = computed(() => stepsList.value[currentIndex.value + 1]);
  const showSubmit = computed(() => stepsList.value[currentIndex.value].id === 'formAdditionalData');

  const onSetStep = (index: number): void => {
    if (index >= 0 && index <= stepsList.value.length - 1)
      currentIndex.value = index;
  }

  const gotoPrevStep = (): void => {
    return onSetStep(currentIndex.value - 1);
  }

  const gotoNextStep = async (): Promise<void> => {
    onSetStep(currentIndex.value + 1);
    return
  }

  const componentForm = computed(() => {
    switch (currentStep.value.id) {
      case 'formPersonalData':
        return FormPersonalData
      case 'formEmploymentData':
        return EmploymentData
      case 'formAdditionalData':
        return AdditionalData
      default:
        return ''
    }
  })

  // this logic can be as simple or as complex as we want.
  // we can:
  // 1. find the first step with errors and go there
  // 1. decide to give priority to some step and mover there instead
  // 1. If the steps from which user submitted already has errors,
  //    don't go anywhere and stay there.

  const gotoToFirstStepWithErrors = async (): Promise<void> => {
    await nextTick(); // sometimes the stepsmap is not yet updated when this fn runs, so we need nextTick to do the find.
    const pos = Object.keys(steps.value).findIndex(
      (step) => steps.value[step].invalid === true
    );

    if (pos !== -1) {
      return onSetStep(pos);
    }
  }

  return {
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
  }
}