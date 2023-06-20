import { BiCheck } from 'react-icons/bi';

import { Container } from './styles';

interface Step {
  label: string;
  success: boolean;
}

interface StepsProps {
  currentStep: number;
  steps: Step[];
}

export default function Steps({ currentStep, steps }: StepsProps) {
  const percent = 33 * currentStep;

  return (
    <Container>
      {steps.map((step, index) => (
        <div
          className={`step ${currentStep >= index ? 'stepActive' : ''} ${
            step.success ? 'stepSuccess' : ''
          }`}
          key={index}
        >
          <div className="stepButton">
            <div className="stepButtonInner" />
            {step.success && <BiCheck color="#fff" style={{ zIndex: 10 }} />}
          </div>
          <span>{step.label}</span>
        </div>
      ))}
      <div className="progressStep">
        <div className="progress-bar-step" style={{ width: `${percent + '%'}` }} />
      </div>
    </Container>
  );
}
