import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiPaperclip } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../hooks/AuthContext';
import { useToast } from '../../../hooks/toast';
import useColumn from '../../../hooks/useColumn';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useTask from '../../../hooks/useTask';

import { ColumnModel } from '../../../utils/models';

import ButtonDefault from '../../Buttons/ButtonDefault';
import { InputDefault } from '../../Inputs/InputDefault';
import { SelectDefault } from '../../Inputs/SelectDefault';
import { TextAreaDefault } from '../../Inputs/TextAreaDefault';
import ModalDefault from '../../Ui/ModalDefault';
import { FieldDefault, FooterModal } from '../../UiElements/styles';
import { Container, Ul, Li } from './styles';
import { IconDash } from '../../../assets/icons';

interface IMenu {
  to: string;
  onClick?(): void;
  icon?: any;
  name: string;
  identifier: string;
}

interface ISiderbar {
  menus: IMenu[];
  path: string;
  modalActive: boolean;
}

interface FormDataProps {
  nome: string;
  cliente: string;
  projeto: string;
  alocados: string;
  quadro: string;
  tipo: string;
  ordem: string;
  dataFinal: string;
  descricao: string;
  anexo: string;
}

export default function Sidebar({ menus, path, modalActive }: ISiderbar) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [state] = useLocalStorage('COLUMN');
  const { column } = useColumn();
  const { addTask } = useTask();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState<any>();

  const [formData, setFormData] = useState<FormDataProps>({
    nome: '',
    cliente: '',
    projeto: '',
    alocados: '',
    quadro: '',
    tipo: '',
    ordem: '',
    dataFinal: '',
    descricao: '',
    anexo: ''
  });

  const modaOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const columnSelected = column.filter((obj: any) => obj.card_id === Number(formData.quadro));

      const newData = {
        ...formData,
        task_id: columnSelected.length + 1
      };

      addTask(columnSelected[0], newData);

      addToast({
        type: 'success',
        title: 'Otimo',
        description: 'Os dados estao de acordo!'
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log('ERROR', error);
      setLoading(false);
      addToast({
        type: 'danger',
        title: 'Atenção',
        description: 'Dados invalidos!'
      });
    }
    // await api.post('points', data);
  }

  useEffect(() => {
    const newMenu = user.permissions;
    const filteredMenu = menus?.filter((obj) => newMenu.includes(obj.identifier));
    setMenuSidebar(filteredMenu);
    // console.log('menus original', menus);
    // console.log('menus filtrados', filteredMenu);
  }, [user, menus]);

  return (
    <Container modalActive={modalActive}>
      {user?.permissions?.includes('jobs_tasks_execute') && (
        <Link to={'/criar-tarefa'}>
          <ButtonDefault typeButton="primary" style={{ marginTop: '20px', width: '100%' }}>
            <BiPlus />
            {!modalActive && <div>Nova tarefa</div>}
          </ButtonDefault>
        </Link>
      )}

      <Ul>
        <Li active={path === '/dashboard' ? true : false} modalActive={modalActive}>
          <Link to={'/dashboard'}>
            <IconDash />
            <span>Dashboard</span>
          </Link>
        </Li>
        {menuSidebar?.map((row: IMenu, key: any) => (
          <Li key={key} active={path === row.to ? true : false} modalActive={modalActive}>
            <Link to={row.to} onClick={row.onClick ? row.onClick : () => ''}>
              <row.icon />
              <span>{row.name}</span>
            </Link>
            <span className="tooltip">{row.name}</span>
          </Li>
        ))}
      </Ul>

      <ModalDefault isOpen={modal} title="Hello World" onOpenChange={setModal}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Nome" name="nome" onChange={handleInputChange} />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Cliente" name="cliente" onChange={handleInputChange} required />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Projeto" name="projeto" onChange={handleInputChange} required />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Alocados" name="alocados" onChange={handleInputChange} />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <SelectDefault label="Quadro" name="quadro" onChange={handleSelectChange}>
              {column.map((row: any) => (
                <option key={row.card_id} value={row.card_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Tipo" name="tipo" onChange={handleInputChange} />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Ordem" name="ordem" onChange={handleInputChange} />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <InputDefault label="Data Final" name="dataFinal" onChange={handleInputChange} />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '14px' }}>
            <TextAreaDefault label="Descrição" name="descricao" onChange={handleTextareaChange} />
          </FieldDefault>

          <FooterModal>
            <ButtonDefault typeButton="light">
              <FiPaperclip />
              Anexar
            </ButtonDefault>

            <div className="fieldGroup">
              <ButtonDefault typeButton="danger" isOutline onClick={modalClose}>
                DESCARTAR
              </ButtonDefault>

              <ButtonDefault type="submit" loading={loading}>
                SALVAR
              </ButtonDefault>
            </div>
          </FooterModal>
        </form>
      </ModalDefault>
    </Container>
  );
}
