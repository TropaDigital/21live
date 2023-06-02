/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect } from 'react';

// Icons
import { IconContext } from 'react-icons';
import { BiMinus, BiPlus } from 'react-icons/bi';

// Styles
import { CounterButton, NumberInput, WrapperCounter } from './style';

// Hooks
import { useToast } from '../../../hooks/toast';

interface InputProps {
  receiveQuantity: number;
  infosReceived: any;
  handleQuantity: (value: any) => void;
  disabledInput: boolean;
}

export default function QuantityInput({
  receiveQuantity,
  infosReceived,
  handleQuantity,
  disabledInput
}: InputProps) {
  const [counter, setCounter] = useState<number>(0);
  const { addToast } = useToast();

  useEffect(() => {
    setCounter(receiveQuantity);
  }, [receiveQuantity]);

  useEffect(() => {
    console.log('log do receive quantity', infosReceived);
  }, [infosReceived]);

  const handleChangeCounter = (name: string) => {
    if (disabledInput) {
      addToast({
        type: 'warning',
        title: 'ATENÇÃO',
        description: 'Selecione o produto antes da quantidade'
      });
    } else if (name === 'up') {
      setCounter(counter + 1);
      handleQuantity(counter + 1);
    } else {
      setCounter(counter - 1);
      handleQuantity(counter - 1);
    }
  };

  return (
    <WrapperCounter>
      <IconContext.Provider value={{ color: 'var(--primary)', className: 'react-icons' }}>
        <CounterButton onClick={() => handleChangeCounter('down')}>
          <BiMinus />
        </CounterButton>
        <NumberInput>
          <input
            type="text"
            value={counter}
            onChange={(e) => {
              setCounter(Number(e.target.value)), handleQuantity(Number(e.target.value));
            }}
            disabled={disabledInput}
          />
        </NumberInput>
        <CounterButton onClick={() => handleChangeCounter('up')}>
          <BiPlus />
        </CounterButton>
      </IconContext.Provider>
    </WrapperCounter>
  );
}
