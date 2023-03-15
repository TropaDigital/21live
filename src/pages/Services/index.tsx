import { useCallback, useState } from 'react';
import { BiCode, BiPlus, BiSearchAlt, BiTime, BiX } from 'react-icons/bi';

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
import ScrollAreas from '../../components/Ui/ScrollAreas';
import {
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal
} from '../../components/UiElements/styles';

import * as Dialog from '@radix-ui/react-dialog';
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
  const [open, setOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { formData, setData, handleOnChange } = useForm({
    service: '',
    description: '',
    type: '',
    size: '',
    minutes: '',
    service_id: 0
  } as FormDataProps);

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [titleModalService, setTitleModalService] = useState('Novo Serviço');
  const [dataDelete, setDataDelete] = useState({
    text: 'Deseja excluir serviço:',
    id: 0
  });
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const [selected, setSelected] = useState(1);
  const { data, pages, fetchData } = useFetch<ServicesProps[]>(`services?search=${search}`);

  const handleOnCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  function handleOnModalDelete(id: number, service: string) {
    setDataDelete({
      text: `Deseja excluir serviço: ${service}`,
      id
    });
    setModalDelete(!modalDelete);
  }

  const handleOnCloseModalService = () => {
    setOpen(!open);
    setTitleModalService('Novo serviço');
    setData({
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      service_id: 0
    } as FormDataProps);
  };

  function handleOnEditService(data: any) {
    setData(data);
    setTitleModalService('Edite serviço');
    setOpen(true);
  }

  const handleOnToggleModal = (toggle: boolean) => {
    setOpen(toggle);
  };

  const handleOnDeleteService = useCallback(async (event: any, data: any) => {
    try {
      event.preventDefault();
      await api.delete(`services/${data.id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: `Serviço: ${data.text} deletado com sucesso!`
      });

      setModalDelete(false);
      fetchData();
    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message
      });
    }
  }, []);

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

        if (titleModalService === 'Edite serviço') {
          await api.put(`services/${formData.service_id}`, newFormData);
        } else {
          await api.post('services', newFormData);
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
        });

        setOpen(false);
        setData({
          service: '',
          description: '',
          type: '',
          size: '',
          minutes: '',
          service_id: 0
        } as FormDataProps);
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
    [formData, titleModalService, setData]
  );

  return (
    <Container>
      <HeaderPage title="Serviços">
        <ButtonDefault typeButton="success" onClick={handleOnCloseModalService}>
          <BiPlus color="#fff" />
          Novo Serviço
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
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
        {/* <ButtonDefault
          style={{ marginTop: '24px', float: 'right' }}
          typeButton="info"
        >
          <BiFilter />
        </ButtonDefault> */}
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Serviços">
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
                      <ButtonTable typeButton="edit" onClick={() => handleOnEditService(row)} />
                      <ButtonTable
                        typeButton="delete"
                        onClick={() => handleOnModalDelete(row.service_id, row.service)}
                      />
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

      <Dialog.Root open={open} onOpenChange={(open) => handleOnToggleModal(open)}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">{titleModalService}</Dialog.Title>
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
                <ButtonDefault typeButton="dark" isOutline onClick={handleOnCloseModalService}>
                  Descartar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" isOutline type="submit">
                  Salvar
                </ButtonDefault>
              </FooterModal>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={modalDelete} onOpenChange={() => handleOnCloseModalDelete()}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent" style={{ width: '480px' }}>
            <Dialog.Title className="DialogTitle">{dataDelete.text}</Dialog.Title>
            <form onSubmit={(event) => handleOnDeleteService(event, dataDelete)}>
              <FieldGroupFormDefault style={{ marginTop: '40px' }}>
                <ButtonDefault typeButton="dark" isOutline onClick={handleOnCloseModalDelete}>
                  Cancelar
                </ButtonDefault>
                <ButtonDefault
                  typeButton="danger"
                  type="submit"
                  onClick={(event) => handleOnDeleteService(event, dataDelete)}
                >
                  Deletar
                </ButtonDefault>
              </FieldGroupFormDefault>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Container>
  );
}
