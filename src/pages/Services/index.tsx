/* eslint-disable @typescript-eslint/no-unused-vars */
// React
import { useCallback, useState, useEffect } from 'react';
// Icons
import { BiCode, BiFilter, BiPlus, BiSearchAlt, BiTime } from 'react-icons/bi';
// Libraries
import Switch from 'react-switch';

// Services
import api from '../../services/api';

// Hooks
import { useToast } from '../../hooks/toast';
import useDebouncedCallback from '../../hooks/useDebounced';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import ButtonTable from '../../components/Buttons/ButtonTable';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import InputSwitchDefault from '../../components/Inputs/InputSwitchDefault';
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

import {
  Summary,
  SummaryInfoWrapper,
  SummaryTaskInfo
} from '../Staks/ComponentSteps/SummaryTasks/styles';
import { EstimatedTime, EstimatedTimeInputs, ModalProductWrapper } from './styles';

interface ServicesProps {
  service_id?: number | string;
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
  category: string;
  flag: string;
  service_id?: number | string;
}

interface estimatedHoursPros {
  hours: string;
  minutes: string;
}

export default function Services() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange, handleOnChangeSwitch, handleOnChangeMinutes } =
    useForm({
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      category: '',
      flag: 'false',
      service_id: ''
    } as FormDataProps);

  const [modal, setModal] = useState({
    isOpen: false,
    type: ''
  });
  const [modalShowProduct, setModalShowProduct] = useState({
    isOpen: false,
    type: '',
    product: {
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      category: '',
      flag: ''
    }
  });

  const [modalKit, setModalKit] = useState({
    isOpen: false,
    type: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const [typeList, setTypeList] = useState('produtos');

  const { data, pages, fetchData } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const { data: dataCategory } = useFetch<any[]>(`category?search=${search}`);
  const { data: dataKits, pages: pageKits } = useFetch<any[]>(`pack-services?search=${search}`);
  const [selected, setSelected] = useState(1);
  const [selectedKitPage, setSelectedKitPage] = useState(1);
  const [listSelected, setListSelected] = useState<any[]>([]);
  const [estimatedTime, setEstimatedTime] = useState<estimatedHoursPros>({
    hours: '',
    minutes: ''
  });

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo produto'
    });
    setData({
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      service_id: 0
    } as FormDataProps);
    setEstimatedTime({
      hours: '',
      minutes: ''
    });
  }, [setData]);

  const handleOnEdit = (item: FormDataProps) => {
    setData(item);

    setEstimatedTime({
      hours: item.minutes.split(':')[0],
      minutes: item.minutes.split(':')[1]
    });

    setModal({
      isOpen: true,
      type: `Editar serviço: ${item.service}`
    });
  };

  const handleOnShowProduct = (item: FormDataProps) => {
    console.log('log do row to show', item);

    setModalShowProduct({
      isOpen: true,
      type: `Produto: ${item.service}`,
      product: {
        category: item.category,
        description: item.description,
        flag: item.flag,
        minutes: item.minutes,
        service: item.service,
        size: item.size,
        type: item.type
      }
    });
  };

  const handleOnEditKit = (item: FormDataProps) => {
    // setData(item);

    setModalKit({
      isOpen: true,
      type: `Editar Kit: ${item.service}`
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

        const { service, description, type, minutes, category, flag, size } = formData;
        const newFormData = {
          service,
          description,
          category,
          flag,
          type,
          size,
          minutes
        };

        if (modal.type === 'Novo produto') {
          await api.post('services', newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Serviço criado com sucesso!'
          });
        } else {
          await api.put(`services/${formData.service_id}`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Serviço salvo com sucesso!'
          });
        }

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

  const handleAddHours = (event: any) => {
    const { name, value } = event.target;
    if (name === 'hours') {
      setEstimatedTime({ hours: value, minutes: estimatedTime.minutes });
    }
    if (name === 'minutes') {
      if (value > 59) {
        setEstimatedTime({ hours: estimatedTime.hours, minutes: '59' });
      } else {
        setEstimatedTime({ hours: estimatedTime.hours, minutes: value });
      }
    }

    handleOnChangeMinutes({
      name: 'minutes',
      value: `${estimatedTime.hours}:${estimatedTime.minutes}`
    });
  };

  // useEffect(() => {
  //   console.log('log do formData', formData);
  // }, [formData]);

  return (
    <ContainerDefault>
      <HeaderPage title="Produtos">
        <ButtonDefault
          typeButton="success"
          onClick={() =>
            setModal({
              isOpen: !modal.isOpen,
              type: 'Novo produto'
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
            {typeList === 'produtos' && (
              <h2>
                Lista de produtos <strong>{data?.length} produtos</strong>
              </h2>
            )}
            {typeList === 'kits' && (
              <h2>
                Lista de kits <strong>02 kits</strong>
              </h2>
            )}
            {/* <span>Acompanhe seus produtos e serviços pré-cadastrados</span> */}
          </div>

          <FieldGroup style={{ justifyContent: 'flex-end' }}>
            <FieldTogleButton>
              <ButtonDefault
                onClick={() => handleOnTypeList('produtos')}
                typeButton={typeList === 'produtos' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Produtos
              </ButtonDefault>
              <ButtonDefault
                onClick={() => handleOnTypeList('kits')}
                typeButton={typeList === 'kits' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Kits
              </ButtonDefault>
            </FieldTogleButton>

            <div style={{ maxWidth: '280px' }}>
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
            </div>

            {/* <ButtonDefault typeButton="light">
              <BiFilter />
              Filtros
            </ButtonDefault> */}
          </FieldGroup>
        </TableHead>
        {typeList === 'produtos' && (
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
                      // checked={
                      //   listSelected.includes(row.service_id) || row.flag === 'true' ? true : false
                      // }
                      checked={row.flag === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => handleOnShowProduct(row)} />
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
        )}
        {typeList === 'kits' && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Produtos</th>
                <th>Status</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {dataKits?.map((row) => (
                <tr key={row.pack_id}>
                  <td>{row.pack_id}</td>
                  <td>{row.title}</td>
                  <td>{row.services.map((item: any, index: any) => (index ? ', ' : '') + item)}</td>
                  <td>
                    <Switch
                      onChange={() => handleList(row.service_id)}
                      // checked={
                      //   listSelected.includes(row.service_id) || row.flag === 'true' ? true : false
                      // }
                      checked={row.flag === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable
                        typeButton="view"
                        onClick={() =>
                          setModalKit({
                            isOpen: true,
                            type: ''
                          })
                        }
                      />
                      <ButtonTable typeButton="edit" onClick={() => console.log('row edit', row)} />
                      <Alert
                        title="Atenção"
                        subtitle="Certeza que gostaria de deletar este Serviço? Ao excluir a acão não poderá ser desfeita."
                        confirmButton={() => console.log('row delete', row)}
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
                    total={pageKits.total}
                    perPage={pageKits.perPage}
                    currentPage={selectedKitPage}
                    lastPage={pageKits.lastPage}
                    onClickPage={(e) => setSelectedKitPage(e)}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </Table>

      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit} style={{ minWidth: '500px' }}>
          <FieldDefault>
            <InputDefault
              label="Produto"
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
            <SelectDefault
              label="Categoria"
              placeholder="Selecione aqui..."
              name="category"
              onChange={handleOnChange}
              value={formData.category}
              required
            >
              {modal.type.includes('Editar servico') && (
                <option selected={true} value={formData.category}>
                  {formData.category}
                </option>
              )}
              {dataCategory?.map((row) => (
                <option key={row.category_id} value={row.category}>
                  {row.category}
                </option>
              ))}
            </SelectDefault>
            {/* <InputDefault
              label="Categoria"
              placeholder="Teste"
              name="category"
              onChange={handleOnChange}
              value={formData.category}
              required
            /> */}
          </FieldDefault>
          <FieldDefault>
            <InputSwitchDefault
              onChange={(e) => handleOnChangeSwitch({ name: 'flag', value: e.target.checked })}
              isChecked={formData.flag}
              label="Listar produto"
            />
          </FieldDefault>
          <FieldDefault>
            <EstimatedTime>
              <span>Tempo estimado em Horas : Minutos</span>
              <EstimatedTimeInputs>
                <InputDefault
                  label=""
                  name="hours"
                  onChange={handleAddHours}
                  value={estimatedTime.hours}
                  type="number"
                  min="0"
                  step="1"
                  icon={BiTime}
                  required
                />
                :
                <InputDefault
                  label=""
                  name="minutes"
                  onChange={handleAddHours}
                  value={estimatedTime.minutes}
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  icon={BiTime}
                  required
                />
              </EstimatedTimeInputs>
            </EstimatedTime>
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

      <ModalDefault
        isOpen={modalShowProduct.isOpen}
        title={modalShowProduct.type}
        onOpenChange={() =>
          setModalShowProduct({
            isOpen: false,
            type: '',
            product: {
              service: '',
              description: '',
              type: '',
              size: '',
              minutes: '',
              category: '',
              flag: ''
            }
          })
        }
      >
        <ModalProductWrapper>
          <Summary>
            <SummaryInfoWrapper>
              <SummaryTaskInfo>
                <div className="title-info">Descrição:</div>
                <div className="info">{modalShowProduct.product.description}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Horas:</div>
                <div className="info">{modalShowProduct.product.minutes}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Categoria:</div>
                <div className="info">{modalShowProduct.product.category}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tamanho:</div>
                <div className="info">{modalShowProduct.product.size}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tipo:</div>
                <div className="info">{modalShowProduct.product.type}</div>
              </SummaryTaskInfo>
            </SummaryInfoWrapper>
          </Summary>
        </ModalProductWrapper>
      </ModalDefault>

      <ModalDefault
        isOpen={modalKit.isOpen}
        title={'Mostrar o kit'}
        onOpenChange={() =>
          setModalKit({
            isOpen: false,
            type: ''
          })
        }
      >
        <div>Vai mostrar kit</div>
      </ModalDefault>
    </ContainerDefault>
  );
}
