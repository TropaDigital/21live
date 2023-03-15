import { useState } from 'react';

interface FormProps {
  [key: string]: any;
}

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

type HandleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => void;

type ResetForm = () => void;
type SetItem = (item: any) => void;

type SetFormValue = (name: string, value: any) => void;

interface FormHook {
  formData: FormProps;
  handleOnChange: HandleOnChange;
  handleOnChangeCheckbox: HandleOnChangeCheckbox;
  resetForm: ResetForm;
  setFormValue: SetFormValue;
  setData: SetItem;
}

const useForm = (initialValues: FormProps): FormHook => {
  const [formData, setFormData] = useState<FormProps>(initialValues);

  const handleOnChange: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnChangeCheckbox: HandleOnChangeCheckbox = (event) => {
    const { checked, name } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const resetForm: ResetForm = () => {
    setFormData(initialValues);
  };

  const setFormValue: SetFormValue = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const setData = (item: FormProps) => {
    setFormData(item);
  };

  return { formData, handleOnChange, handleOnChangeCheckbox, resetForm, setFormValue, setData };
};

export default useForm;
