// React
import { useState } from 'react';

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
  contract_type: string;
  hours_total: number;
  data: any;
}

export default function CardProductsSelected({
  handleOnPeriod,
  id,
  title,
  contract_type,
  hours_total,
  data
}: ProductsProps) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [timeCounter, setTimeCounter] = useState<number>(0);
  const verifyPeriod = contract_type === 'mensal' ? false : true;

  const handleOptions = (status: boolean) => {
    if (status) {
      setOpenCard(false);
    } else {
      setOpenCard(true);
    }
  };

  const handleCounter = (counter: any) => {
    setTimeCounter(counter.quantitySelected);

    if (counter.quantitySelected < timeCounter) {
      console.log('log do numero diminuindo');
    } else if (counter.quantitySelected > timeCounter) {
      console.log('log do numero aumentando');
    }
    console.log('log do counter inside card product', counter);
  };

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
                handleOnPeriod(e.target.checked, id);
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
            />
          </EstimatedHours>
        </CardBottom>
      </CardProduct>
    </ContainerCard>
  );
}
