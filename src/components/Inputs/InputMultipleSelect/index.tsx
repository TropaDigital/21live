import React, {
  InputHTMLAttributes,
} from 'react';
import Select from 'react-select'
import { IconBaseProps } from 'react-icons';
import { FaAngleDown } from 'react-icons/fa';

import { Container, ContainerInput } from './styles';

interface ErrorInput {
  message: string;
  isError: boolean;
}

interface InputProps  {
  label: string;
  error?: ErrorInput;
  icon?: React.ComponentType<IconBaseProps>;
  options: any
  name: string;
  isDisabled?: boolean
  onChange: (options: any, meta: any) => void;
}

export default function InputMultipleSelect({ label, options, name, onChange, error, icon: Icon, isDisabled }: InputProps) {

  return (
    <Container>
      <label htmlFor={label}>{label}</label>

      <ContainerInput
        isErrored={!!error?.isError}
        isIcon={!!Icon}
      >

        <div className="leftInputElement">
          {Icon && <Icon color='#CCCCCC' />}
        </div>

        <Select
          // defaultValue={[colourOptions[2], colourOptions[3]]}
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
    </Container>
  );
}
