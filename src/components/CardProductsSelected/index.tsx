// React
import { useState } from 'react';

// Icons
import { IconArrowDown } from '../../assets/icons';

// Styles
import InputSwitchDefault from '../Inputs/InputSwitchDefault';
import QuantityCounter from '../QuantityCounter';
import {
  ArrowButton,
  CardBottom,
  CardProduct,
  CardProductTitle,
  CardTop,
  EstimatedHours,
  SwitchSelector,
  WrapperCard
} from './styles';

interface ProductsProps {
  // handleOnDecrementQtd: (e: any) => void;
  // handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  // handleOnDeleteProduct: (item: any) => void;
  // handleInputProduct: (value: any) => void;
  data: any;
}

export default function CardProductsSelected({ data, handleOnPeriod }: ProductsProps) {
  const [openCard, setOpenCard] = useState<boolean>(false);
  const verifyPeriod = data?.period === 'mensal' ? false : true;

  const handleOptions = (status: boolean) => {
    if (status) {
      setOpenCard(false);
    } else {
      setOpenCard(true);
    }
  };

  return (
    <WrapperCard>
      <CardProduct openOptions={openCard}>
        <CardTop>
          <CardProductTitle>#1 - HORA DE CRIAÇÃO</CardProductTitle>
          <ArrowButton onClick={() => handleOptions(openCard)}>
            <IconArrowDown />
          </ArrowButton>
        </CardTop>
        <CardBottom>
          <SwitchSelector>
            <span>Mensal</span>
            <InputSwitchDefault
              onChange={(e) => {
                handleOnPeriod(e.target.checked, 1);
              }}
              value={String(verifyPeriod)}
            />
            <span>Anual</span>
          </SwitchSelector>
          <EstimatedHours>
            <div className="hours">
              Horas estimadas: <strong>01:00</strong>
            </div>
            <QuantityCounter clearQuantity={() => ''} />
          </EstimatedHours>
        </CardBottom>
      </CardProduct>
      {/* <CardProduct>
        <CardProductTitle>#2 - Diagnóstico 21BRZ</CardProductTitle>
        <ArrowButton>
          <IconArrowDown />
        </ArrowButton>
      </CardProduct> */}
    </WrapperCard>
  );
}
