import { InputHTMLAttributes } from 'react';
import { StyledLabel, StyledInput, StyledSwitch, StyledKnob } from './styles';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
}

export default function InputSwitchDefault({ isChecked, ...rest}: SwitchProps) {
  // const [isChecked, setIsChecked] = useState(false);

  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsChecked(e.target.checked);
  // }

  return (
    <StyledLabel>
      <StyledInput 
        // onChange={handleOnChange}
        checked={isChecked}
        type='checkbox'
        {...rest}
      />
      <StyledSwitch>
        <StyledKnob 
          isChecked={isChecked}
        />
      </StyledSwitch>
    </StyledLabel>
  );
}
