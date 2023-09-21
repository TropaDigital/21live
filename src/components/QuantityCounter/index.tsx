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
  editProject?: boolean;
}

export default function QuantityCounter({
  handleQuantity,
  rowQuantity,
  clearQuantity,
  receiveQuantity,
  editProject
}: QuantityProps) {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (receiveQuantity > 0) {
      setCounter(receiveQuantity);
    }
  }, [receiveQuantity]);

  useEffect(() => {
    // if (counter === 0) {
    //   clearQuantity(rowQuantity);
    // }
    // if (counter > 0) {
    //   const productSelected: IProduct = {
    //     project_id: rowQuantity.service_id || rowQuantity.project_id,
    //     service: rowQuantity.service,
    //     description: rowQuantity.description,
    //     type: rowQuantity.type,
    //     size: rowQuantity.size,
    //     quantity: counter,
    //     minutes: '' || rowQuantity.minutes,
    //     period: '' || rowQuantity.period
    //   };
    //   handleQuantity(productSelected);
    // }
  }, [counter]);

  function clearCounter(value: number) {
    if (value === 0) {
      setCounter(0);
      clearQuantity(rowQuantity);
    }
  }

  function incrementCounter() {
    if (!editProject) {
      setCounter(counter + 1);

      const productSelected: IProduct = {
        service_id: rowQuantity.service_id || rowQuantity.project_id || rowQuantity.product_id,
        service: rowQuantity.service,
        description: rowQuantity.description,
        flag: rowQuantity.flag,
        type: rowQuantity.type,
        size: rowQuantity.size,
        quantity: counter + 1,
        minutes: '' || rowQuantity.minutes,
        minutes_creation: '' || rowQuantity.minutes_creation,
        minutes_essay: '' || rowQuantity.minutes_essay,
        period: '' || rowQuantity.period
      };
      handleQuantity(productSelected);
    }
  }

  function decrementCount() {
    if (!editProject) {
      setCounter(counter - 1);
      const productSelected: IProduct = {
        service_id: rowQuantity.service_id || rowQuantity.project_id || rowQuantity.product_id,
        service: rowQuantity.service,
        description: rowQuantity.description,
        flag: rowQuantity.flag,
        type: rowQuantity.type,
        size: rowQuantity.size,
        quantity: counter - 1,
        minutes: '' || rowQuantity.minutes,
        minutes_creation: '' || rowQuantity.minutes_creation,
        minutes_essay: '' || rowQuantity.minutes_essay,
        period: '' || rowQuantity.period
      };
      handleQuantity(productSelected);
    }
  }

  return (
    <Container>
      {counter === 1 && (
        <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => clearCounter(0)}>
          <IconTrash />
        </CounterFieldsBtn>
      )}
      {counter === 0 && (
        <CounterFieldsBtn>
          <IconMinus />
        </CounterFieldsBtn>
      )}
      {counter > 1 && (
        <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => decrementCount()}>
          <IconMinus />
        </CounterFieldsBtn>
      )}
      <CounterFields>{counter}</CounterFields>
      <CounterFieldsBtn style={{ cursor: 'pointer' }} onClick={() => incrementCounter()}>
        <IconPlus />
      </CounterFieldsBtn>
    </Container>
  );
}
