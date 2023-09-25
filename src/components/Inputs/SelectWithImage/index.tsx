// React
import { useCallback, useRef, useState } from 'react';

// Styles
import { ContainerSelect, LabelSelect } from './styles';

// Libraries
import Select from 'react-select';
import { ErrorInputMessage } from '../InputDefault/styles';

interface SelectProps {
  label: string;
  dataOptions: any;
  value: any;
  onChange: (value: any) => void;
  placeholder: string;
  error: any;
}

export default function SelectImage({
  label,
  dataOptions,
  value,
  onChange,
  placeholder,
  error
}: SelectProps) {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <ContainerSelect>
      <LabelSelect>{label}</LabelSelect>
      <Select
        placeholder={placeholder ? placeholder : 'Selecione...'}
        value={value}
        options={dataOptions}
        onChange={onChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        formatOptionLabel={(obj) => (
          <div className="client-option">
            {obj.image !== '' && <img src={obj.image} alt="client-image" />}
            <span>{obj.label}</span>
          </div>
        )}
        styles={{
          control: (provided: Record<string, unknown>) => ({
            ...provided,
            height: '40px',
            cursor: 'pointer',
            border: isFocused
              ? '1px solid #3182ce'
              : error !== undefined
              ? '1px solid #e62965'
              : '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            boxShadow: isFocused
              ? '0px 0px 0px 1px #3182ce'
              : error !== undefined
              ? '0px 0px 0px 1px #F04438'
              : '#e2e8f0'
          }),
          placeholder: (provided: Record<string, unknown>) => ({
            ...provided,
            color: '#cccccc',
            fontSize: '16px',
            fontWeight: '400'
          })
        }}
      />
      {error !== '' && (
        <ErrorInputMessage title={''}>
          <span>{error}</span>
        </ErrorInputMessage>
      )}
    </ContainerSelect>
  );
}
