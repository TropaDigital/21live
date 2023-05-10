/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Icons
import { IconArrowDown } from '../../assets/icons';

// Components
import InputSwitchDefault from '../Inputs/InputSwitchDefault';
import QuantityCounter from '../QuantityCounter';
// Styles
import {
  ArrowButton,
  CardBottom,
  CardProduct,
  CardProductTitle,
  CardTop,
  EstimatedHours,
  SwitchSelector,
  ContainerCard
} from './styles';

interface ProductsProps {
  // handleOnDecrementQtd: (e: any) => void;
  // handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  // handleOnDeleteProduct: (item: any) => void;
  id: number;
  title: string;
  contract_type: any;
  hours_total: any;
  data: any;
}

export default function CardProductsSelected({
  handleOnPeriod,
  id,
  title,
  hours_total,
  data
}: ProductsProps) {
  const [openCard, setOpenCard] = useState<boolean>(true);
  const [timeCounter, setTimeCounter] = useState<number>(0);
  const [contractType, setContractType] = useState<any>('mensal');
  const verifyPeriod = contractType === 'mensal' ? false : true;

  const handleOptions = (status: boolean) => {
    if (status) {
      setOpenCard(false);
    } else {
      setOpenCard(true);
    }
  };

  const handleCounter = (counter: any) => {
    setTimeCounter(counter.quantity);
  };

  const handleSwitch = (value: any) => {
    setContractType(value === true ? 'anual' : 'mensal');
  };

  useEffect(() => {
    hours_total({ timeCounter, contractType });
  }, [timeCounter]);

  return (
    <ContainerCard>
      <CardProduct openOptions={openCard}>
        <CardTop>
          <CardProductTitle>
            #{id} - {title}
          </CardProductTitle>
          <ArrowButton onClick={() => handleOptions(openCard)}>
            <IconArrowDown />
          </ArrowButton>
        </CardTop>
        <CardBottom>
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
          <EstimatedHours>
            <div className="hours">
              Horas estimadas: <strong>{timeCounter}:00</strong>
            </div>
            <QuantityCounter
              clearQuantity={() => setTimeCounter(0)}
              handleQuantity={handleCounter}
              rowQuantity={data}
              receiveQuantity={data.minutes}
            />
          </EstimatedHours>
        </CardBottom>
      </CardProduct>
    </ContainerCard>
  );
}
