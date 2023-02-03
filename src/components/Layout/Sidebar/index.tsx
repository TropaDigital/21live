import { useState, FormEvent, ChangeEvent } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiPaperclip } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import ButtonDefault from '../../Buttons/ButtonDefault';
import { InputDefault } from '../../Inputs/InputDefault';
import { SelectDefault } from '../../Inputs/SelectDefault';
import { TextAreaDefault } from '../../Inputs/TextAreaDefault';
import ModalDefault from '../../Ui/ModalDefault';
import { FieldDefault, FooterModal } from '../../UiElements/styles';

import { Container, Ul, Li } from './styles';

interface IMenu {
  to: string;
  onClick?(): void;
  icon?: any;
  name: string;
}

interface ISiderbar {
  menus: IMenu[];
  path: string;
  modalActive: boolean;
}

interface FormDataProps {
  title: string;
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
  const { addToast } = useToast()
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    nome: "",
    cliente: "",
    projeto: "",
    alocados: "",
    quadro: "",
    tipo: "",
    ordem: "",
    dataFinal: "",
    descricao: "",
    anexo: ""
  })

  const modaOpen = () => {
    setModal(true);
  }

  const modalClose = () => {
    setModal(false)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  }

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  }

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      
      addToast({
        type: "success",
        title: "Otimo",
        description: "Os dados estao de acordo!",
      });

      setTimeout(() => {
        setLoading(false);

      }, 1000)

    }catch(error) {
      setLoading(false);
      addToast({
        type: "danger",
        title: "Atenção",
        description: "Dados invalidos!",
      });
    }

    // await api.post('points', data);


  }

  return (
    <Container modalActive={modalActive}>
      {/* <Scrollbars
        renderTrackVertical={() => <div className="scrolltrack" />}
        style={{ width: '100%', height: '100%' }}
        autoHide
      > */}
        <ButtonDefault 
          onClick={modaOpen}
          style={{ marginTop: '20px' }}
        >
          <BiPlus />
          {!modalActive && 'Nova tarefa'}
        </ButtonDefault>

        <Ul>
          
          {menus.map((row, key) => (
            <Li
              key={key}
              active={path === row.to ? true : false}
              modalActive={modalActive}
            >
              <Link to={row.to} onClick={row.onClick ? row.onClick : () => {}}>
                <row.icon />
                <span>{row.name}</span>
              </Link>
              <span className="tooltip">{row.name}</span>
            </Li>
          ))}
        </Ul>
      {/* </Scrollbars> */}

      <ModalDefault 
        isOpen={modal}
        title='Hello World'
        onOpenChange={setModal}
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault 
              label='Nome'
              name='nome'
              onChange={handleInputChange}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Cliente'
              name='cliente'
              onChange={handleInputChange}
              required
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Projeto'
              name='projeto'
              onChange={handleInputChange}
              required
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Alocados'
              name='alocados'
              onChange={handleInputChange}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label='Quadro'
              name='quadro'
              onChange={handleSelectChange}
            >
              <option value="option1">opção 1</option>
              <option value="option2">opção 2</option>
              <option value="option3">opção 3</option>
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Tipo'
              name='tipo'
              onChange={handleInputChange}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Ordem'
              name='ordem'
              onChange={handleInputChange}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault 
              label='Data Final'
              name='dataFinal'
              onChange={handleInputChange}
            />
          </FieldDefault>

          <FieldDefault>
            <TextAreaDefault 
              label='Descrição' 
              name='descricao'
              onChange={handleTextareaChange}
            />
          </FieldDefault>

          <FooterModal>
            <ButtonDefault
              typeButton="light"
            >
              <FiPaperclip />
              Anexar
            </ButtonDefault>

            <div className="fieldGroup">
              <ButtonDefault
                typeButton="danger"
                isOutline
                onClick={modalClose}
              >
                DESCARTAR
              </ButtonDefault>

              <ButtonDefault
                type='submit'
                loading={loading}
              >
                SALVAR
              </ButtonDefault>
            </div>
          </FooterModal>

        </form>
      </ModalDefault>

    </Container>
  );
}
