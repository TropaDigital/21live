/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// Types
import { IProduct } from '../../types';

// Icons
import { IconMinus, IconPlus, IconTrash } from '../../assets/icons';

// Styles
import { Container, CounterFields, CounterFieldsBtn } from './styles';

interface QuantityProps {
  handleQuantity?: any;
  rowQuantity?: any;
  clearQuantity?: any;
  receiveQuantity?: any;
}

export default function QuantityCounter({
  handleQuantity,
  rowQuantity,
  clearQuantity,
  receiveQuantity
}: QuantityProps) {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (receiveQuantity > 0) {
      setCounter(receiveQuantity);
    }
  }, [receiveQuantity]);

  useEffect(() => {
    if (counter === 0) {
      clearQuantity(rowQuantity);
    }
    if (counter > 0) {
      const productSelected: IProduct = {
        project_id: rowQuantity.service_id || rowQuantity.product_id,
        service: rowQuantity.service,
        description: rowQuantity.description,
        type: rowQuantity.type,
        size: rowQuantity.size,
        quantity: counter,
        minutes: '',
        period: ''
      };
      handleQuantity(productSelected);
    }
  }, [counter]);

  return (
    <Container>
      {counter === 1 && (
        <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => setCounter(0)}>
          <IconTrash />
        </CounterFieldsBtn>
      )}
      {counter === 0 && (
        <CounterFieldsBtn>
          <IconMinus />
        </CounterFieldsBtn>
      )}
      {counter > 1 && (
        <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => setCounter(counter - 1)}>
          <IconMinus />
        </CounterFieldsBtn>
      )}
      <CounterFields>{counter}</CounterFields>
      <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => setCounter(counter + 1)}>
        <IconPlus />
      </CounterFieldsBtn>
    </Container>
  );
}
