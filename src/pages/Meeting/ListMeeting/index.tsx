import { useState, useCallback } from 'react';
import { BiCalendar, BiEdit, BiPlus, BiSearchAlt } from 'react-icons/bi';

// HOOKS
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';

// UTILS
import { dataFake } from '../../../utils/dataDefault';

// COMPONENTS
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ComponentsForms from '../../components/ComponentsForms';

// STYLES
import { ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import { Container } from './styles';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import InputMultipleSelect from '../../../components/Inputs/InputMultipleSelect';
import UploadFiles from '../../Projects/ComponentSteps/UploadFiles';

interface UploadedFilesProps {
  file?: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
}

export default function ListMeeting() {
  const { addToast } = useToast();
  const [modal, setModal] = useState(false)

  const { data, fetchData } = useFetch<any[]>('meetings');
  const { data: dataClient, fetchData: fetchClient } = useFetch<any[]>('tenant');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);

  const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: '',
    client: {},
    isEmail: '',
    response: '',
    members: [],
    data: '',
    uploadList: [],
    description: ''
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedId = parseInt(event.target.options[selectedIndex].value);
    const selectedItem = dataClient?.find((item: any) => Number(item.tenant_id) === selectedId);
    setSelectedItem(selectedItem);
    setFormData({ 
      ...formData,
      client: {
        idbucket: selectedItem?.bucket,
        name: selectedItem?.name,
        slug: selectedItem?.slug,
        tenant_id: selectedItem?.tenant_id
      }
    });
  };

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

    } catch (e: any) {
      // Exibir erro
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, []);

  return (
    <Container>
      <HeaderPage title="Atas e Reuniões">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <SelectDefault
            label="Filtro por data"
            name="data"
            placeHolder="Selecione uma data"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

          <SelectDefault
            label="Ordenar por"
            name="order"
            placeHolder="Titulo"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => console.log(event.target.value)}
            icon={BiSearchAlt}
            // isLoading={isSearching}
            // value={searchTerm}
          />

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Todas">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>ID</th>
                <th>Titulo</th>
                <th>Cliente</th>
                <th>Responsável</th>
                <th>Data</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {dataFake?.map((row) => (
                <tr key={row.card_id}>
                  <td>
                    {row.card_id}
                  </td>
                  <td>{row.name}</td>
                  <td>
                    {row.step}
                  </td>
                  <td>{row.email_alert}</td>
                  <td>{row.necessary_upload}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="info" onClick={() => console.log(row.card_id)}>
                        <BiEdit />
                      </ButtonDefault>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>

      </ContainerGroupTable>

      <ModalDefault
        isOpen={modal}
        onOpenChange={setModal}
        title='Criar nova Ata de Reunião'
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo da Ata/Reunião"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Cliente"
              name="client"
              placeHolder="Selecione"
              onChange={handleChangeClient}
              value={selectedItem?.tenant_id}
            >
              {dataClient?.map((row) => (
                <option key={row.tenant_id} value={row.tenant_id}>{row.name}</option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputSwitchDefault 
              name="client"
              label='Enviar para o cliente por e-mail'
              onChange={() => {}}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Responsável"
              name="response"
              placeHolder="Selecione"
              onChange={handleOnChange}
              value={formData.response}
            >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputMultipleSelect 
              name='members'
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
              label='Membros'
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault
              label="Data"
              placeholder="00/00/0000"
              name="date"
              type='date'
              icon={BiCalendar}
              onChange={handleOnChange}
              value={formData.data}
            />
          </FieldDefault>

          <FieldDefault>
            {/* <InputDefault
              label="Escolha um arquivo"
              // placeholder="00/00/0000"
              name="file"
              type='file'
              // onChange={(event: any) => console.log('name', event.target.files[0])}
            /> */}

            <UploadFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={selectedItem?.tenant_id}
            />
          </FieldDefault>

          <FieldDefault>
            <ComponentsForms />
          </FieldDefault>
             

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => setModal(!modal)}
            >
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </Container>
  )
}
