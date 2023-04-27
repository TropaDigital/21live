/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// Icons
import { IconMinus, IconPlus, IconTrash } from '../../assets/icons';

// Styles
import { Container, CounterFields } from './styles';

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
        quantityOfProduct: counter,
        selectedProduct: rowQuantity
      };
      handleQuantity(selectedRow);
    }
  }, [counter]);

  return (
    <Container>
      {counter > 0 && (
        <CounterFields style={{ cursor: 'pointer' }} onClick={() => setCounter(0)}>
          <IconTrash />
        </CounterFields>
      )}
      {counter < 1 && (
        <CounterFields style={{ cursor: 'pointer' }}>
          <IconMinus />
        </CounterFields>
      )}
      <CounterFields>{counter}</CounterFields>
      <CounterFields style={{ cursor: 'pointer' }} onClick={() => setCounter(counter + 1)}>
        <IconPlus />
      </CounterFields>
    </Container>
  );
}
