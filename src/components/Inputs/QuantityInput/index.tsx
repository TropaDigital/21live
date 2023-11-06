/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect } from 'react';

// Icons
import { IconContext } from 'react-icons';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IconTrash } from '../../../assets/icons';

// Styles
import { CounterButton, NumberInput, WrapperCounter } from './style';

// Hooks
import { useToast } from '../../../hooks/toast';

interface InputProps {
  receiveQuantity: number;
  infosReceived?: any;
  handleQuantity: (value: any) => void;
  clearQuantity: () => void;
  disabledInput: boolean;
  isEditProject?: boolean;
}

export default function QuantityInput({
  receiveQuantity,
  handleQuantity,
  clearQuantity,
  disabledInput,
  isEditProject
}: InputProps) {
  const [counter, setCounter] = useState<number>(0);
  const { addToast } = useToast();

  useEffect(() => {
    setCounter(receiveQuantity);
  }, [receiveQuantity]);

  // useEffect(() => {
  //   console.log('log do receive quantity', infosReceived);
  // }, [infosReceived]);

  const handleChangeCounter = (name: string) => {
    if (disabledInput) {
      if (isEditProject) {
        addToast({
          type: 'warning',
          title: 'ATENÇÃO',
          description: 'Não permitido alterar quantidade'
        });
      } else {
        addToast({
          type: 'warning',
          title: 'ATENÇÃO',
          description: 'Selecione o produto antes da quantidade'
        });
      }
    } else if (name === 'up') {
      setCounter(counter + 1);
      handleQuantity(counter + 1);
    } else {
      if (counter > 0) {
        setCounter(counter - 1);
        handleQuantity(counter - 1);
      }
    }
  };

  const handleClear = () => {
    clearQuantity();
    setCounter(0);
  };

  return (
    <WrapperCounter>
      <IconContext.Provider value={{ color: 'var(--primary)', className: 'react-icons' }}>
        {counter === 0 && (
          <CounterButton>
            <BiMinus />
          </CounterButton>
        )}
        {counter > 1 && (
          <CounterButton onClick={() => handleChangeCounter('down')}>
            <BiMinus />
          </CounterButton>
        )}
        {counter === 1 && (
          <CounterButton onClick={() => handleClear()}>
            <IconTrash />
          </CounterButton>
        )}
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
