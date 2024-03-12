// React
import { useCallback, useState } from 'react';

// Styles
import { FilterBtnWrapper } from './styles';

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

// Hooks
import useDebouncedCallback from '../../hooks/useDebounced';

// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import useForm from '../../hooks/useForm';

interface TemplateProps {
  title: string;
  description: string;
}

export default function TemplateAgenda() {
  const { formData, setFormValue, setData, handleOnChange } = useForm({
    title: '',
    description: ''
  } as TemplateProps);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [modalTemnplate, setModalTemplate] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

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

        // if (modal.type === 'Criar nova Ata de Reunião') {
        //   await api.post(`meetings`, newFormData);
        // } else {
        //   await api.put(`meetings/${formData.meeting_id}`, newFormData);
        // }

        // addToast({
        //   type: 'success',
        //   title: 'Sucesso',
        //   description: 'Ata de reunião criada com sucesso!'
        // });

        setModalTemplate(false);
        setData({
          title: '',
          description: ''
        } as TemplateProps);
        setText('');
        // fetchData();

        setLoading(false);
      } catch (e: any) {
        console.log('ERROR =>', e);
        // addToast({
        //   type: 'danger',
        //   title: 'ATENÇÃO',
        //   description: e.response.data.message
        // });

        setLoading(false);
      }
    },
    [formData, text, setData]
  );

  const handleOnCancel = () => {
    setModalTemplate(false);
    setData({
      title: '',
      description: ''
    } as TemplateProps);
    setText('');
  };

  const mockTemplates = [
    {
      id: 0,
      name: 'Object 0',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ipsa fugiat reiciendis alias impedit nulla enim obcaecati laudantium assumenda hic inventore. Iste neque commodi numquam ipsam delectus iure tempore ea.'
    },
    {
      id: 1,
      name: 'Object 1',
      description: 'Description of object 1.'
    },
    {
      id: 2,
      name: 'Object 2',
      description: 'Description of object 2.'
    },
    {
      id: 3,
      name: 'Object 3',
      description: 'Description of object 3.'
    },
    {
      id: 4,
      name: 'Object 4',
      description: 'Description of object 4.'
    },
    {
      id: 5,
      name: 'Object 5',
      description: 'Description of object 5.'
    },
    {
      id: 6,
      name: 'Object 6',
      description: 'Description of object 6.'
    },
    {
      id: 7,
      name: 'Object 7',
      description: 'Description of object 7.'
    },
    {
      id: 8,
      name: 'Object 8',
      description: 'Description of object 8.'
    },
    {
      id: 9,
      name: 'Object 9',
      description: 'Description of object 9.'
    }
  ];

  return (
    <ContainerDefault>
      <HeaderPage title="Templates" />

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
                  <th>Nome</th>
                  <th style={{ color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {mockTemplates.map((row) => (
                  <tr key={row.id}>
                    <td>#{String(row.id).padStart(5, '0')}</td>
                    <td>{row.name}</td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable
                          typeButton="view"
                          // onClick={() => handleViewTask(row.id)}
                          onClick={() => setModalTemplate(true)}
                        />

                        <ButtonTable typeButton="edit" onClick={() => setModalTemplate(true)} />

                        <ButtonTable typeButton="copy" onClick={() => ''} />

                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar este Template? Ao excluir a ação não poderá ser desfeita!"
                          confirmButton={() => ''}
                        >
                          <ButtonTable typeButton="delete" />
                        </Alert>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* <tfoot>
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
              </tfoot> */}
            </table>
          </Table>
        </div>
      </SectionDefault>

      <ModalDefault
        isOpen={modalTemnplate}
        onOpenChange={() => setModalTemplate(false)}
        title={formData.title === '' ? 'Criar template' : 'Editar template'}
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
              // error={errors?.title}
            />
          </FieldDefault>

          <FieldEditor style={{ width: '600px' }}>
            <WrapperEditor
              mentionData={[]}
              value={text}
              handleOnDescription={(value: any) => setText(value)}
            />
          </FieldEditor>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </ContainerDefault>
  );
}
