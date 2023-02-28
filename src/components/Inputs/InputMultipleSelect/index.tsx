import React, {
  InputHTMLAttributes,
} from 'react';
import Select from 'react-select'
import { IconBaseProps } from 'react-icons';
import { FaAngleDown } from 'react-icons/fa';

import { Container, ContainerInput } from './styles';
import { IoMdHelpCircle } from 'react-icons/io';
import { Alert, ErrorInputMessage } from '../InputDefault/styles';

interface ErrorInput {
  message: string;
  isError: boolean;
}

interface InputProps  {
  label: string;
  error?: string;
  icon?: React.ComponentType<IconBaseProps>;
  options: any
  name: string;
  isDisabled?: boolean
  onChange: (options: any, meta: any) => void;
  defaultValue?: any
  alert?: string;
}

export default function InputMultipleSelect({ label, alert, options, name, defaultValue, onChange, error, icon: Icon, isDisabled }: InputProps) {

  return (
    <Container>
      <div className="containerAlert" style={{ display: 'flex', alignItems: 'center' }} >
        <label htmlFor={label}>{label}</label>
        {alert && (
          <Alert title={alert ?? 'Campo obrigatório'}>
            <IoMdHelpCircle size={18} color='#CED4DA' />
          </Alert>
        )}
      </div>

      <ContainerInput
        isErrored={!!error}
        isIcon={!!Icon}
        isDisabled={isDisabled}
      >

        <div className="leftInputElement">
          {Icon && <Icon color='#CCCCCC' />}
        </div>

        <Select
          isMulti
          name={name}
          options={options}
          className="react-select-container"
          classNamePrefix="react-select"
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary25: '#039BE5',
              primary: 'rgb(49, 130, 206)',
              neutral10: '#EAECF0',
              neutral20: '#e2e8f0',
            },
          })}
          isDisabled={isDisabled}
          onChange={(options, meta) => onChange(options, meta)}
          defaultValue={defaultValue}
        />


        <div className="rightInputElement">
          <FaAngleDown color='rgba(204, 204, 204, 1)' />
        </div>

        {/* {error?.isError && (
          <Error title={error.message}>
            <FiAlertCircle size={20} color="#E62965" />
          </Error>
        )} */}
      </ContainerInput>

      {error && (
          <ErrorInputMessage title={error}>
            <span>{error}</span>
          </ErrorInputMessage>
        )}
    </Container>
  );
}
