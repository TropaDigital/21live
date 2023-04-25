/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState, useEffect } from 'react';
import { BiCode, BiFilter, BiPlus, BiSearchAlt, BiTime } from 'react-icons/bi';
import Switch from 'react-switch';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import useDebouncedCallback from '../../hooks/useDebounced';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';

import ButtonDefault from '../../components/Buttons/ButtonDefault';
import ButtonTable from '../../components/Buttons/ButtonTable';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { TextAreaDefault } from '../../components/Inputs/TextAreaDefault';
import Pagination from '../../components/Pagination';
import { Table } from '../../components/Table';
import { FieldTogleButton, TableHead } from '../../components/Table/styles';
import Alert from '../../components/Ui/Alert';
import ModalDefault from '../../components/Ui/ModalDefault';
import {
  ContainerDefault,
  FieldDefault,
  FieldGroup,
  FooterModal
} from '../../components/UiElements/styles';

import moment from 'moment';

interface ServicesProps {
  service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  created: string;
  updated: string;
  category: string;
  flag: string;
}

interface FormDataProps {
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  service_id: number;
}

export default function Services() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    service: '',
    description: '',
    type: '',
    size: '',
    minutes: '',
    service_id: 0
  } as FormDataProps);

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Novo Serviço'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const [typeList, setTypeList] = useState('produtos');

  const { data, pages, fetchData } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const [selected, setSelected] = useState(1);
  const [listSelected, setListSelected] = useState<any[]>([]);

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo serviço'
    });
    setData({
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      service_id: 0
    } as FormDataProps);
  }, [setData]);

  const handleOnEdit = (item: FormDataProps) => {
    setData(item);

    setModal({
      isOpen: true,
      type: `Editar serviço: ${item.service}`
    });
  };

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`services/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço foi deletado!'
      });

      fetchData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // Inserir lógica
        const { service, description, type, minutes, size, service_id } = formData;
        const newFormData = {
          service,
          description,
          type,
          size,
          minutes,
          service_id
        };

        if (modal.type === 'Novo Serviço') {
          await api.post('services', newFormData);
        } else {
          await api.put(`services/${formData.service_id}`, newFormData);
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
        });

        handleOnCancel();
        fetchData();
      } catch (e: any) {
        // Exibir erro
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
    },
    [formData, addToast, fetchData, handleOnCancel, modal]
  );

  function handleList(value: any) {
    if (listSelected.includes(value)) {
      setListSelected(listSelected.filter((obj) => obj !== value));
    } else {
      setListSelected((obj) => [...obj, value]);
    }
  }

  return (
    <ContainerDefault>
      <HeaderPage title="Produtos">
        <ButtonDefault
          typeButton="success"
          onClick={() =>
            setModal({
              isOpen: !modal.isOpen,
              type: 'Novo serviço'
            })
          }
        >
          <BiPlus color="#fff" />
          Adicionar produto
        </ButtonDefault>
      </HeaderPage>

      <Table>
        <TableHead>
          <div className="groupTable">
            <h2>
              Todos os produtos <strong>240 produtos</strong>
            </h2>
            <span>Acompanhe seus produtos e serviços pré-cadastrados</span>
          </div>

          <FieldGroup style={{ justifyContent: 'flex-end' }}>
            <FieldTogleButton>
              <ButtonDefault
                onClick={() => handleOnTypeList('produtos')}
                typeButton={typeList === 'produtos' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Ver Produtos
              </ButtonDefault>
              <ButtonDefault
                onClick={() => handleOnTypeList('kits')}
                typeButton={typeList === 'kits' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Ver Kits
              </ButtonDefault>
            </FieldTogleButton>

            <InputDefault
              label=""
              name="search"
              placeholder="Faça sua busca..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
              value={searchTerm}
              icon={BiSearchAlt}
              isLoading={isLoading}
            />

            <ButtonDefault typeButton="light">
              <BiFilter />
              Filtros
            </ButtonDefault>
          </FieldGroup>
        </TableHead>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Listar produtos</th>
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr key={row.service_id}>
                <td>#{row.service_id}</td>
                <td>{row.service}</td>
                <td>{row.category}</td>
                <td>
                  <Switch
                    onChange={() => handleList(row.service_id)}
                    checked={listSelected.includes(row.service_id) ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#0046B5"
                  />
                </td>
                <td>
                  <div className="fieldTableClients">
                    <ButtonTable typeButton="view" onClick={() => console.log('row view', row)} />
                    <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                    <Alert
                      title="Atenção"
                      subtitle="Certeza que gostaria de deletar este Serviço? Ao excluir a acão não poderá ser desfeita."
                      confirmButton={() => handleOnDelete(row.service_id)}
                    >
                      <ButtonTable typeButton="delete" />
                    </Alert>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={100}>
                <Pagination
                  total={pages.total}
                  perPage={pages.perPage}
                  currentPage={selected}
                  lastPage={pages.lastPage}
                  onClickPage={(e) => setSelected(e)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </Table>

      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Serviço"
              placeholder="Digite aqui..."
              name="service"
              onChange={handleOnChange}
              value={formData.service}
              required
            />
          </FieldDefault>
          <FieldDefault>
            <TextAreaDefault
              label="Descrição"
              placeholder="Digite aqui..."
              name="description"
              onChange={handleOnChange}
              value={formData.description}
              required
            />
          </FieldDefault>
          <FieldDefault>
            <SelectDefault
              label="Tipo"
              placeholder="Tipo"
              name="type"
              onChange={handleOnChange}
              value={formData.type}
              required
            >
              <option key={'impresso'} value={'impresso'}>
                Impresso
              </option>
              <option key={'digital'} value={'digital'}>
                Digital
              </option>
            </SelectDefault>
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="Tamanho"
              placeholder="Ex: 170x80"
              name="size"
              onChange={handleOnChange}
              value={formData.size}
              icon={BiCode}
              required
            />
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="Hora / Minutos"
              name="minutes"
              onChange={handleOnChange}
              value={formData.minutes}
              type="time"
              icon={BiTime}
              required
            />
          </FieldDefault>
          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </ContainerDefault>
  );
}
