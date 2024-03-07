/* eslint-disable react/display-name */
// React
import React, { ButtonHTMLAttributes } from 'react';

// Styles
import { Container } from './styles';

// Icons
import { BiCalendar, BiCopy, BiEdit, BiShow, BiTrash } from 'react-icons/bi';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  typeButton?: 'view' | 'delete' | 'edit' | 'work' | 'copy';
}

const icons = {
  view: <BiShow size={20} />,
  copy: <BiCopy size={20} />,
  delete: <BiTrash size={20} />,
  edit: <BiEdit size={20} />,
  work: <BiCalendar size={20} />
};

const ButtonTable = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, typeButton, ...rest }, ref) => {
    return (
      <Container typeButton={typeButton} disabled={loading} type="button" ref={ref} {...rest}>
        {icons && icons[typeButton || 'view']}
      </Container>
    );
  }
);

export default ButtonTable;
