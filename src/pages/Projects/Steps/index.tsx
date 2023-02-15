import { BiCheck } from 'react-icons/bi';
import { Container } from './styles';

export default function Steps({ currentStep }: any) {
  const percent = 33 * currentStep

  return (
    <Container>
      <div className={`step stepActive ${currentStep >= 1 ? "stepSuccess" : ""}`}>
        <div className="stepButton">
          <div className="stepButtonInner" />
          {currentStep >= 1 && (
            <BiCheck color='#fff' style={{ zIndex: 10 }}/>
          )}
        </div>
        <span>Geral</span>
      </div>

      <div className={`step ${currentStep >= 1 ? "stepActive" : ""} ${currentStep >= 2 ? "stepSuccess" : ""}`}>
        <div className="stepButton">
          <div className="stepButtonInner" />
          {currentStep >= 2 && (
            <BiCheck color='#fff' style={{ zIndex: 10 }}/>
          )}
        </div>
        <span>Produtos</span>
      </div>

      <div className={`step ${currentStep >= 2 ? "stepActive" : ""} ${currentStep >= 3 ? "stepSuccess" : ""}`}>
        <div className="stepButton">
          <div className="stepButtonInner" />
          {currentStep >= 3 && (
            <BiCheck color='#fff' style={{ zIndex: 10 }}/>
          )}
        </div>
        <span>Produtos</span>
      </div>

      <div className={`step ${currentStep >= 3 ? "stepActive" : ""} ${currentStep >= 4 ? "stepSuccess" : ""}`}>
        <div className="stepButton">
          <div className="stepButtonInner" />
          {currentStep >= 4 && (
            <BiCheck color='#fff' style={{ zIndex: 10 }}/>
          )}
        </div>
        <span>Produtos</span>
      </div>

      <div className="progressStep">
        <div className="progress-bar-step" style={{ width: `${percent + '%'}` }}/>
      </div> 
    </Container>
  )
}
