import { useCallback, useState } from 'react';
import { BiCode, BiPlus, BiSearchAlt, BiTime } from 'react-icons/bi';

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
import Paginate from '../../components/Paginate';
import { TableDefault } from '../../components/TableDefault';
import Alert from '../../components/Ui/Alert';
import ModalDefault from '../../components/Ui/ModalDefault';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import {
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal
} from '../../components/UiElements/styles';

import moment from 'moment';

import { Container } from './styles';

interface ServicesProps {
  service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  created: string;
  updated: string;
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

  const { data, pages, fetchData } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const [selected, setSelected] = useState(1);

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

  return (
    <Container>
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
          Adicionar produtos
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault>
        <FieldGroupFormDefault>
          {/* <SelectDefault
            label="FILTRO"
            name="filter"
            onChange={(event) => console.log('filter', event)}
            placeholder="Todos"
          >
            {optionsCoffe.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </SelectDefault> */}

          <InputDefault
            label="BUSCA"
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
        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Todos os produtos">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>Código</th>
                <th>Serviço</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Tamanho</th>
                <th>Minutos</th>
                <th>Data</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.service_id}>
                  <td>{row.service_id}</td>
                  <td>{row.service}</td>
                  <td>{row.description}</td>
                  <td>{row.type}</td>
                  <td>{row.size}</td>
                  <td>{row.minutes}</td>
                  <td>{moment(row.created).utc().format('DD:MM:YYYY')}</td>
                  <td>
                    <div className="fieldTableClients">
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
          </TableDefault>
        </ScrollAreas>
      </ContainerGroupTable>

      <Paginate
        total={pages.total}
        perPage={pages.perPage}
        currentPage={selected}
        lastPage={pages.lastPage}
        onClickPage={(e) => setSelected(e)}
      />

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
    </Container>
  );
}
