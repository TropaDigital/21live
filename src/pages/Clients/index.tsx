/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useId, useState } from 'react';

// Icons
import { BiEdit, BiFilter, BiPlus, BiSearchAlt, BiX } from 'react-icons/bi';
import { HiOutlineEye } from 'react-icons/hi';

// Services
import api from '../../services/api';

// Utils
import { convertToMilliseconds } from '../../utils/convertToMilliseconds';
import { useDebounce } from '../../utils/useDebounce';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import InputSwitchDefault from '../../components/Inputs/InputSwitchDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { TableDefault } from '../../components/TableDefault';
import ProgressBar from '../../components/Ui/ProgressBar';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import {
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal
} from '../../components/UiElements/styles';

// Libraries
import * as Dialog from '@radix-ui/react-dialog';

// Styles
import { Container } from './styles';

interface UserProps {
  avatar: string;
  email: string;
  name: string;
  tenant_id: number;
  user_id: number;
  username: string;
}

export default function Clients() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UserProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([] as any);
  const [isSearching, setSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setResults(
        avatarData.filter((obj: any) => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearching(false);
    } else {
      setResults([]);
      setSearching(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    const response = await api.get('tenant');

    setData(response.data.result);
  }

  const optionsCoffe = [
    {
      id: 1,
      name: 'Cagfé Melita'
    },
    {
      id: 2,
      name: 'Café Pelé'
    },
    {
      id: 3,
      name: 'Café Tres corações'
    }
  ];

  const avatarData = [
    {
      id: 1,
      name: 'João',
      url: 'http://userimage.png',
      isOnline: true
    },
    {
      id: 2,
      name: 'Maria',
      url: 'http://userimage.png',
      isOnline: false
    },
    {
      id: 3,
      name: 'Pedro',
      url: 'http://userimage.png',
      isOnline: true
    },
    {
      id: 4,
      name: 'Bete',
      url: 'http://userimage.png',
      isOnline: false
    },
    {
      id: 5,
      name: 'Mario',
      url: 'http://userimage.png',
      isOnline: true
    },
    {
      id: 6,
      name: 'Pedro',
      url: 'http://userimage.png',
      isOnline: true
    },
    {
      id: 7,
      name: 'Bete',
      url: 'http://userimage.png',
      isOnline: false
    },
    {
      id: 8,
      name: 'Mario',
      url: 'http://userimage.png',
      isOnline: true
    }
  ];

  const [formDataClient, setFormDataClient] = useState({
    name: '',
    code: ''
  });

  const [formData, setFormData] = useState([
    {
      id: useId(),
      client: 'João',
      isActive: true,
      activityHours: '05:20:24',
      projects: '5',
      hoursinvested: '10:00:00',
      hoursLeft: '07:00:00'
    },
    {
      id: useId(),
      client: 'Maria',
      isActive: false,
      activityHours: '02:30:24',
      projects: '4',
      hoursinvested: '10:00:00',
      hoursLeft: '04:00:00'
    },
    {
      id: useId(),
      client: 'Pedro',
      isActive: true,
      activityHours: '04:20:24',
      projects: '2',
      hoursinvested: '10:00:00',
      hoursLeft: '01:00:00'
    },
    {
      id: useId(),
      client: 'Raul',
      isActive: true,
      activityHours: '15:20:24',
      projects: '1',
      hoursinvested: '10:00:00',
      hoursLeft: '05:00:00'
    }
  ]);

  function changePosition(arr: any, from: any, to: any) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  }

  const handleInputChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataClient({ ...formDataClient, [name]: event.target.value });
  };

  const handleSwitchChange = (position: any, id: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const filterData = formData.filter((obj) => obj.id === id);
    filterData[0].isActive = e.target.checked;

    const filterFormData = formData.filter((obj) => obj.id !== id);

    const positionArray = changePosition(filterData.concat(filterFormData), 0, position);
    setFormData(positionArray);
  };

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
    } catch (e: any) {
      console.log(e);
    }
    // Exibir erro
  }, []);

  return (
    <Container>
      <HeaderPage title="Clientes">
        <ButtonDefault typeButton="success" onClick={() => setOpen(!open)}>
          <BiPlus color="#fff" />
          Novo Cliente
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault>
        <FieldGroupFormDefault>
          <SelectDefault
            name="filter"
            label="Filtro"
            placeholder="Todos"
            onChange={(event) => console.log('filter', event)}
          >
            {optionsCoffe.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Faça sua busca..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
          />
        </FieldGroupFormDefault>
        <ButtonDefault style={{ marginTop: '24px', float: 'right' }} typeButton="info">
          <BiFilter />
        </ButtonDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Clientes">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>Código</th>
                <th>Clientes</th>
                <th>Ativo</th>
                <th>Atividade</th>
                <th>Projetos</th>
                <th>Horas investidas</th>
                <th>Horas restantes</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {formData.map((row, key) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.client}</td>
                  <td>
                    <InputSwitchDefault
                      isChecked={row.isActive}
                      onChange={(e) => handleSwitchChange(key, row.id, e)}
                      disabled
                    />
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      width: '220px',
                      textAlign: 'left'
                    }}
                  >
                    {row.activityHours}
                    <ProgressBar
                      totalHours={convertToMilliseconds(row.hoursinvested)}
                      restHours={convertToMilliseconds(row.hoursLeft)}
                    />
                  </td>
                  <td>{row.projects}</td>
                  <td>{row.hoursinvested}</td>
                  <td>{row.hoursLeft}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="warning">
                        <HiOutlineEye />
                      </ButtonDefault>
                      <ButtonDefault typeButton="info">
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

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Novo Cliente</Dialog.Title>
            <form onSubmit={handleOnSubmit}>
              <FieldDefault>
                <InputDefault
                  label="Nome do cliente"
                  name="nome"
                  onChange={(event) => handleInputChange('name', event)}
                />
              </FieldDefault>
              <FieldDefault>
                <InputDefault
                  label="Código do cliente"
                  name="code"
                  onChange={(event) => handleInputChange('code', event)}
                  required
                />
              </FieldDefault>
              <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
                <ButtonDefault typeButton="dark" isOutline onClick={() => setOpen(!open)}>
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
    </Container>
  );
}
