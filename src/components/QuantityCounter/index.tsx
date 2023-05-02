/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// Icons
import { IconMinus, IconPlus, IconTrash } from '../../assets/icons';

// Styles
import { Container, CounterFields, CounterFieldsBtn } from './styles';

interface QuantityProps {
  handleQuantity?: any;
  rowQuantity?: any;
  clearQuantity?: any;
}

export default function QuantityCounter({
  handleQuantity,
  rowQuantity,
  clearQuantity
}: QuantityProps) {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter === 0) {
      clearQuantity(rowQuantity);
    }
    if (counter > 0) {
      const selectedRow = {
        quantitySelected: counter,
        rowQuantity
      };
      handleQuantity(selectedRow);
    }
  }, [counter]);

  return (
    <Container>
      {counter === 1 && (
        <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => setCounter(0)}>
          <IconTrash />
        </CounterFieldsBtn>
      )}
      {counter !== 1 && (
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
