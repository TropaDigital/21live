// React
import { useCallback, useState } from 'react';

// Styles
import { EssayView, FilterBtnWrapper } from './styles';

// Components
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { Table } from '../../components/Table';
import { TableHead } from '../../components/Table/styles';
import {
  ContainerDefault,
  FieldDefault,
  FooterModal,
  SectionDefault
} from '../../components/UiElements/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import ButtonTable from '../../components/Buttons/ButtonTable';
import Alert from '../../components/Ui/Alert';
import ModalDefault from '../../components/Ui/ModalDefault';
import { FieldEditor } from '../Meeting/ListMeeting/styles';
import WrapperEditor from '../../components/WrapperEditor';
import Pagination from '../../components/Pagination';
import ModalLoader from '../../components/Ui/ModalLoader';

// Hooks
import useDebouncedCallback from '../../hooks/useDebounced';
import useForm from '../../hooks/useForm';
import { useFetch } from '../../hooks/useFetch';
import { useToast } from '../../hooks/toast';

// Icons
import { BiFilter, BiPlus, BiSearchAlt } from 'react-icons/bi';

// Services
import api from '../../services/api';

interface TemplateProps {
  title: string;
  description: string;
  task_template_id: string;
}

interface ModalTemplateProps {
  isOpen: boolean;
  type: 'view' | 'edit' | 'create' | 'copy' | '';
}

export default function TemplateAgenda() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    title: '',
    description: '',
    task_template_id: ''
  } as TemplateProps);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<ModalTemplateProps>({
    isOpen: false,
    type: ''
  });
  const [text, setText] = useState<string>('');
  const { data, pages, isFetching, fetchData } = useFetch<TemplateProps[]>(
    `/task/template?search=${search.replace(/[^\w ]/g, '')}teste&page=${selectedPage}`
  );

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        setLoading(true);
        event.preventDefault();

        const { title } = formData;

        const newFormData = {
          title,
          description: text
        };

        if (modalTemplate.type === 'create') {
          await api.post(`/task/template`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Template criado com sucesso!'
          });
        } else if (modalTemplate.type === 'copy') {
          await api.post(`/task/template`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Template copiado com sucesso!'
          });
        } else {
          await api.put(`/task/template/${formData.task_template_id}`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Template editado com sucesso!'
          });
        }

        setModalTemplate({
          isOpen: false,
          type: ''
        });
        setData({
          title: '',
          description: ''
        } as TemplateProps);
        setText('');
        fetchData();

        setLoading(false);
      } catch (error: any) {
        console.log('ERROR submit template =>', error);
        if (error.response.data.result.length !== 0) {
          error.response.data.result.map((row: any) => {
            addToast({
              title: 'Atenção',
              description: row.error,
              type: 'warning'
            });
          });
        } else {
          addToast({
            title: 'Atenção',
            description: error.response.data.message,
            type: 'danger'
          });
        }
        setLoading(false);
      }
    },
    [formData, text, setData, modalTemplate, addToast, fetchData]
  );

  const handleOnCancel = () => {
    setModalTemplate({
      isOpen: false,
      type: ''
    });
    setData({
      title: '',
      description: ''
    } as TemplateProps);
    setText('');
  };

  const handleCopyTemplate = (obj: TemplateProps) => {
    setData(obj);
    setText(obj.description);
    setModalTemplate({
      isOpen: true,
      type: 'copy'
    });
  };

  const handleOnEdit = (obj: TemplateProps) => {
    setData(obj);
    setText(obj.description);
    setModalTemplate({
      isOpen: true,
      type: 'edit'
    });
  };

  const handleViewTemplate = (obj: TemplateProps) => {
    setData(obj);
    setText(obj.description);
    setModalTemplate({
      isOpen: true,
      type: 'view'
    });
  };

  const handleOnDelete = async (id: string) => {
    try {
      await api.delete(`/task/template/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Template deletado com sucesso!'
      });

      handleOnCancel();
      fetchData();
    } catch (error: any) {
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Templates">
        <ButtonDefault
          typeButton="success"
          onClick={() => setModalTemplate({ isOpen: true, type: 'create' })}
        >
          <BiPlus color="#fff" />
          Novo template
        </ButtonDefault>
      </HeaderPage>

      {!isFetching && (
        <SectionDefault>
          <div style={{ margin: '-24px -30px' }}>
            <Table>
              <TableHead>
                <div className="groupTable">
                  <h2>
                    Templates <strong>0 templates</strong>
                    {/* {pages !== null && pages?.total > 0 ? (
                      <strong>
                        {pages?.total <= 1 ? `${pages?.total} usuário` : `${pages?.total} usuários`}{' '}
                      </strong>
                    ) : (
                      <strong>0 usuário</strong>
                    )} */}
                  </h2>
                </div>

                <FilterBtnWrapper>
                  <InputDefault
                    label=""
                    name="search"
                    placeholder="Buscar..."
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      debouncedCallback(event.target.value);
                    }}
                    value={searchTerm}
                    icon={BiSearchAlt}
                    isLoading={isLoading}
                  />

                  {/* <ButtonDefault typeButton="lightWhite" isOutline onClick={() => ''}>
                    <BiFilter />
                    Filtros
                  </ButtonDefault> */}
                </FilterBtnWrapper>
              </TableHead>

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th style={{ color: '#F9FAFB' }}>-</th>
                  </tr>
                </thead>

                <tbody>
                  {data !== null && data?.length > 0 ? (
                    data.map((row) => (
                      <tr key={row.task_template_id}>
                        <td>#{String(row.task_template_id).padStart(5, '0')}</td>
                        <td>{row.title}</td>
                        <td>
                          <div className="fieldTableClients">
                            <ButtonTable
                              typeButton="view"
                              onClick={() => {
                                setModalTemplate({
                                  isOpen: true,
                                  type: 'view'
                                });
                                handleViewTemplate(row);
                              }}
                            />

                            <ButtonTable
                              typeButton="edit"
                              onClick={() => {
                                setModalTemplate({
                                  isOpen: true,
                                  type: 'edit'
                                });
                                handleOnEdit(row);
                              }}
                            />

                            <ButtonTable
                              typeButton="copy"
                              onClick={() => handleCopyTemplate(row)}
                            />

                            <Alert
                              title="Atenção"
                              subtitle="Certeza que gostaria de deletar este Template? Ao excluir a ação não poderá ser desfeita!"
                              confirmButton={() => handleOnDelete(row.task_template_id)}
                            >
                              <ButtonTable typeButton="delete" />
                            </Alert>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center' }}>
                        Sem templates
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={100}>
                      <Pagination
                        total={pages.total}
                        perPage={pages.perPage}
                        currentPage={selectedPage}
                        lastPage={pages.lastPage}
                        onClickPage={(e) => setSelectedPage(e)}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Table>
          </div>
        </SectionDefault>
      )}

      {/* Modal edit/create/show template */}
      <ModalDefault
        isOpen={modalTemplate.isOpen}
        onOpenChange={() => handleOnCancel()}
        title={
          modalTemplate.type === 'create'
            ? 'Criar template'
            : modalTemplate.type === 'edit'
            ? 'Editar template'
            : modalTemplate.type === 'view'
            ? 'Ver template'
            : modalTemplate.type === 'copy'
            ? 'Copiar template'
            : ''
        }
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo da Ata/Reunião"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
              alert="Titulo é obrigatório"
              disabled={modalTemplate.type === 'view' ? true : false}
              // error={errors?.title}
            />
          </FieldDefault>

          <FieldEditor style={{ width: '600px' }}>
            {modalTemplate.type === 'view' && (
              <EssayView>
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </EssayView>
            )}

            {modalTemplate.type !== 'view' && (
              <WrapperEditor
                mentionData={[]}
                value={text}
                handleOnDescription={(value: any) => setText(value)}
              />
            )}
          </FieldEditor>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            {modalTemplate.type === 'view' && (
              <ButtonDefault
                loading={loading}
                typeButton="primary"
                isOutline
                onClick={handleOnCancel}
              >
                Fechar
              </ButtonDefault>
            )}
            {modalTemplate.type !== 'view' && (
              <>
                <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
                  Descartar
                </ButtonDefault>
                <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
                  Salvar
                </ButtonDefault>
              </>
            )}
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal loading */}
      <ModalLoader isOpen={isFetching} />
    </ContainerDefault>
  );
}
