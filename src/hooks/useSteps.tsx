import { useState } from "react";

export function useSteps(steps: any) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(i?: any, event?: any) {
    if(event) event.preventDefault();

    if(i < 0 || i >= steps.length) return;

    setCurrentStep(i);
  }
  
  return { 
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    isLastStep: currentStep + 1 === steps.length ? true : false,
    isFirstStep: currentStep === 0 ? true : false, 
  }
}