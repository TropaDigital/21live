/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Components
import InputSwitchDefault from '../Inputs/InputSwitchDefault';

// Styles
import {
  ArrowButton,
  CardBottom,
  CardProduct,
  CardProductTitle,
  CardTop,
  EstimatedHours,
  SwitchSelector,
  ContainerCard,
  QuantitySelected
} from './styles';

// Utils
import { multiplyTime } from '../../utils/convertTimes';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface ProductsProps {
  // handleOnDecrementQtd: (e: any) => void;
  // handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  // handleOnDeleteProduct: (item: any) => void;
  id: number;
  title: string;
  contract_type: any;
  data: any;
  showSwitch: any;
}

export default function CardProductsSelected({
  handleOnPeriod,
  id,
  title,
  contract_type,
  data,
  showSwitch
}: ProductsProps) {
  const [openCard, setOpenCard] = useState<boolean>(true);
  // const [timeCounter, setTimeCounter] = useState<number>(0);
  const [contractType, setContractType] = useState<any>('mensal');
  const verifyPeriod = contractType === 'mensal' ? false : true;

  const handleOptions = (status: boolean) => {
    if (status) {
      setOpenCard(false);
    } else {
      setOpenCard(true);
    }
  };

  // const handleCounter = (counter: any) => {
  //   setTimeCounter(counter.quantity);
  // };

  const handleSwitch = (value: any) => {
    setContractType(value === true ? 'anual' : 'mensal');
  };

  // useEffect(() => {
  //   hours_total({ timeCounter, contractType });
  // }, [timeCounter]);

  useEffect(() => {
    contract_type({ contractType });
  }, [contractType]);

  // useEffect(() => {
  //   setTimeCounter(data.quantity);
  // }, []);

  return (
    <ContainerCard>
      <CardProduct openOptions={openCard}>
        <CardTop>
          <CardProductTitle>
            #{String(id).padStart(2, '0')} - {title}
          </CardProductTitle>
          <ArrowButton onClick={() => handleOptions(openCard)}>
            {!openCard ? <FiChevronDown /> : <FiChevronUp />}
          </ArrowButton>
        </CardTop>
        <CardBottom>
          {showSwitch !== 'spot' && (
            <SwitchSelector>
              <span>Mensal</span>
              <InputSwitchDefault
                onChange={(e) => {
                  handleSwitch(e.target.checked);
                }}
                value={String(verifyPeriod)}
              />
              <span>Anual</span>
            </SwitchSelector>
          )}
          <EstimatedHours>
            <div className="hours">
              Horas estimadas: <strong>{multiplyTime(data?.minutes, data?.quantity)}</strong>
            </div>
            {/* <QuantityCounter
              clearQuantity={() => setTimeCounter(0)}
              handleQuantity={handleCounter}
              rowQuantity={data}
              receiveQuantity={data.quantity}
            /> */}
          </EstimatedHours>
          <QuantitySelected>
            Quantidade: <strong>{data.quantity}</strong>
          </QuantitySelected>
        </CardBottom>
      </CardProduct>
    </ContainerCard>
  );
}
