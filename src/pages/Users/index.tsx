import { useCallback, useId, useState } from 'react';
import { BiEdit, BiPlus, BiSearchAlt, BiX } from 'react-icons/bi';
import { HiOutlineEye } from 'react-icons/hi';

import useDebouncedCallback from '../../hooks/useDebounced';
import { useFetch } from '../../hooks/useFetch';

import { generateNameAndColor } from '../../utils/generateNameAndColors';

import ButtonDefault from '../../components/Buttons/ButtonDefault';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { TableDefault } from '../../components/TableDefault';
import AvatarDefault from '../../components/Ui/Avatar/avatarDefault';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import {
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal
} from '../../components/UiElements/styles';

import * as Dialog from '@radix-ui/react-dialog';

import { Container } from './styles';

interface UserProps {
  avatar: string;
  email: string;
  name: string;
  tenant_id: number;
  user_id: number;
  username: string;
}

export default function Users() {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data } = useFetch<UserProps[]>(`user`);
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
      url: null,
      isOnline: false
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
      <HeaderPage title="Usuario">
        <>
          <ButtonDefault typeButton="info" onClick={() => setOpen(!open)}>
            <BiEdit color="#fff" />
            Cargos e permissões
          </ButtonDefault>

          <ButtonDefault typeButton="success" onClick={() => setOpen(!open)}>
            <BiPlus color="#fff" />
            Novo usuário
          </ButtonDefault>
        </>
      </HeaderPage>

      <ContentDefault>
        <FieldGroupFormDefault>
          <SelectDefault
            name="filterOffice"
            label="CARGO"
            placeholder="Todos"
            onChange={(event) => console.log('filterOffice', event)}
          >
            {optionsCoffe.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>

          <SelectDefault
            name="order"
            label="ORDENAR POR"
            placeholder="Nome"
            onChange={(event) => console.log('order', event)}
          >
            {optionsCoffe.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>

          <InputDefault
            label="BUSCA"
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
        </FieldGroupFormDefault>
        {/* <ButtonDefault
          style={{ marginTop: '24px', float: 'right' }}
          typeButton="info"
        >
          <BiDownload color="#fff" />
        </ButtonDefault> */}
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Usuario">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
                <th>Nome</th>
                <th>Nome usuário</th>
                <th>Email</th>
                <th>Cargo</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.user_id}>
                  <td style={{ padding: '1rem' }}>
                    <AvatarDefault url={row.avatar} name={generateNameAndColor(row.name)} />
                  </td>
                  <td>{row.name}</td>
                  {/* <td>
                    <InputSwitchDefault
                      isChecked={row.isActive}
                      onChange={(e) => handleSwitchChange(key, row.id, e)}
                      disabled
                    />
                  </td> */}
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <SelectDefault
                      name="office"
                      label=""
                      placeHolder="Cargo"
                      onChange={(event) => console.log('office', event)}
                      disabled
                    >
                      {optionsCoffe.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.name}
                        </option>
                      ))}
                    </SelectDefault>
                  </td>
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
