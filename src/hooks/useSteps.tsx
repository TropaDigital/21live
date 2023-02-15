import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import api from "../services/api";
import { useToast } from "./toast";

interface PaginationProps {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

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