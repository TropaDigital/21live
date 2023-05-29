/* eslint-disable import-helpers/order-imports */
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
  hours_total: any;
  data: any;
  editing: any;
  showSwitch: any;
}

export default function CardProductsSelected({
  handleOnPeriod,
  id,
  title,
  hours_total,
  data,
  editing,
  showSwitch
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

  useEffect(() => {
    setTimeCounter(data.quantity);
  }, []);

  useEffect(() => {
    console.log('log do switch no product select', showSwitch);
  }, [showSwitch]);

  return (
    <ContainerCard>
      <CardProduct openOptions={openCard}>
        <CardTop>
          <CardProductTitle>
            #{id} - {title}
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
            <QuantityCounter
              clearQuantity={() => setTimeCounter(0)}
              handleQuantity={handleCounter}
              rowQuantity={data}
              receiveQuantity={data.quantity}
            />
          </EstimatedHours>
        </CardBottom>
      </CardProduct>
    </ContainerCard>
  );
}
