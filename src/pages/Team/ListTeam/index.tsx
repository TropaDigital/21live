/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import {
  BiCalendar,
  BiEdit,
  BiEnvelope,
  BiKey,
  BiMoney,
  BiPhoneCall,
  BiPlus,
  BiSearchAlt,
  BiTrash,
  BiUser
} from 'react-icons/bi';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import Alert from '../../../components/Ui/Alert';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import {
  ContainerDefault,
  // ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';
import { Table } from '../../../components/Table';
import { TableHead } from '../../../components/Table/styles';
import Pagination from '../../../components/Pagination';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';

// Libraries
import moment from 'moment';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// Styles
import {
  CardHours,
  CardTitleCheck,
  CardWorkPause,
  CardsWrapper,
  DivHour,
  ModalSubtitle,
  ModalWrapper,
  SelectedTab,
  TabsWrapper
} from './styles';
import { ModalButtons } from '../../Products/ViewProduct/styles';
import { IconTrash } from '../../../assets/icons';

interface UserProps {
  avatar: string;
  birthday: string;
  cost_per_hour: string;
  email: string;
  friday: any;
  function: string;
  function_id: number;
  hiring_date: string;
  monday: any;
  name: string;
  phone: string;
  saturday: any;
  sunday: any;
  tasks: number;
  tenant_id: number;
  thursday: any;
  tuesday: any;
  user_id: number;
  username: string;
  wednesday: any;
  password: string;
  confirmPassword: string;
}

interface OfficeProps {
  function: string;
  function_id: number;
}
export default function Team() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { formData, setData, handleOnChange } = useForm({
    name: '',
    avatar: '',
    function: '',
    function_id: 0,
    birthday: '',
    email: '',
    phone: '',
    username: '',
    cost_per_hour: '',
    hiring_date: '',
    tenant_id: 0,
    user_id: 0,
    password: '',
    confirmPassword: '',
    friday: '',
    monday: '',
    saturday: '',
    sunday: '',
    thursday: '',
    tuesday: '',
    wednesday: ''
  } as UserProps);

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Novo Usuário'
  });

  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const [modalWorkDays, setModalWorkDays] = useState({
    isOpen: false,
    title: 'Carga horária',
    user: ''
  });

  const [selected, setSelected] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data, pages, fetchData } = useFetch<UserProps[]>(
    `team?page=${selected}&search=${search}&perPage=15`
  );
  const { data: dataOffice } = useFetch<OfficeProps[]>(`function`);
  const [selectedTab, setSelectedTab] = useState<string>('Jornada');
  const [workDays, setWorkDays] = useState<any[]>([]);

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo serviço'
    });
    setData({
      name: '',
      avatar: '',
      function: '',
      function_id: 0,
      birthday: '',
      email: '',
      phone: '',
      username: '',
      cost_per_hour: '',
      hiring_date: '',
      tenant_id: 0,
      user_id: 0,
      password: '',
      confirmPassword: ''
    } as UserProps);
  }, [setData]);

  const handleOnEdit = (item: UserProps) => {
    setData(item);

    setModal({
      isOpen: true,
      type: `Alterar usuário: ${item.name}`
    });
  };

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`team/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Equipe foi deletado!'
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
        const { hiring_date, birthday } = formData;

        const newFormData = {
          ...formData,
          hiring_date: moment(hiring_date).utc().format('YYYY-MM-DD'),
          birthday: moment(birthday).utc().format('YYYY-MM-DD')
        };

        if (modal.type === 'Novo Usuário') {
          await api.post('team', newFormData);
        } else {
          await api.put(`team/${formData.user_id}`, newFormData);
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

  const handleEditWorkload = (userInfos: any) => {
    const workdaysArray: any = [];

    weekdays.forEach((day) => {
      const workingHours = userInfos[day];

      if (workingHours) {
        workdaysArray.push({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          start_work: workingHours.start_work,
          end_work: workingHours.end_work
        });
      }
    });

    setWorkDays(workdaysArray);

    setModalWorkDays({
      isOpen: true,
      title: 'Carga horária',
      user: userInfos.user_id
    });
  };

  // const handleCheckDay = (dayIndex: any) => {
  //   const updateCheckedDay = { ...workload };

  //   updateCheckedDay.workday[dayIndex].work = !updateCheckedDay.workday[dayIndex].work;

  //   setWorkload(updateCheckedDay);
  // };

  // const handleTimeChange = (dayIndex: any, field: any, newValue: any) => {
  //   const updatedWorkload: any = { ...workload };

  //   updatedWorkload.workday[dayIndex][field] = newValue;

  //   setWorkload(updatedWorkload);
  // };
  useEffect(() => {
    console.log('log do workDays', workDays);
  }, [workDays]);

  return (
    <ContainerDefault>
      <HeaderPage title="Equipe">
        <>
          <ButtonDefault typeButton="info" onClick={() => navigate('cargos')}>
            <BiEdit color="#fff" />
            Cargos
          </ButtonDefault>

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
            Novo Usuário
          </ButtonDefault>
        </>
      </HeaderPage>

      <SectionDefault>
        <ContentDefault>
          <FieldGroupFormDefault>
            {/* <SelectDefault
              name="filter"
              label="Filtro"
              placeholder="Selecione um cargo"
              onChange={(event) => setFilter(Number(event.target.value))}
            >
              {dataOffice?.map((row) => (
                <option key={row.function_id} value={row.function_id}>
                  {row.function}
                </option>
              ))}
            </SelectDefault> */}

            <InputDefault
              label="Busca"
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

        <div style={{ margin: '-24px -30px' }}>
          <Table>
            <TableHead>
              <div className="groupTable">
                <h2>Equipes</h2>
              </div>
            </TableHead>
            <table>
              <thead>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th>Avatar</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Cargo</th>
                  <th>Jornada</th>
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((row) => (
                  <tr key={row.user_id}>
                    <td style={{ padding: '1rem' }}>
                      <AvatarDefault url={row.avatar} name={row.name} />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.function}</td>
                    <td>40h00 !!!</td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                        <ButtonTable typeButton="work" onClick={() => handleEditWorkload(row)} />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar esta Equipe? Ao excluir a acão não poderá ser desfeita."
                          confirmButton={() => handleOnDelete(row.function_id)}
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
        </div>
      </SectionDefault>

      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Nome do cliente"
              placeholder="Digite seu nome..."
              name="name"
              onChange={handleOnChange}
              value={formData.name}
              icon={BiUser}
            />
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="UserName"
              name="username"
              onChange={handleOnChange}
              value={formData.username}
              required
              placeholder="Digite seu username..."
              icon={BiUser}
            />
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="E-mail"
              name="email"
              onChange={handleOnChange}
              value={formData.email}
              required
              placeholder="admin@admin.com"
              icon={BiEnvelope}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              name="function_id"
              label="Cargo"
              placeholder="Selecione um cargo"
              onChange={handleOnChange}
              value={formData.function_id}
            >
              {dataOffice?.map((row) => (
                <option key={row.function_id} value={row.function_id}>
                  {row.function}
                </option>
              ))}
            </SelectDefault>
          </FieldDefault>
          <FieldGroupFormDefault>
            <FieldDefault>
              <InputDefault
                label="Data nascimento"
                name="birthday"
                onChange={handleOnChange}
                value={formData.birthday}
                required
                type="date"
                icon={BiCalendar}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Data contratação"
                name="hiring_date"
                onChange={handleOnChange}
                value={formData.hiring_date}
                required
                type="date"
                icon={BiCalendar}
              />
            </FieldDefault>
          </FieldGroupFormDefault>
          <FieldGroupFormDefault>
            <FieldDefault>
              <InputDefault
                label="Telefone"
                name="phone"
                onChange={handleOnChange}
                value={formData.phone}
                required
                placeholder="99 9999-9999"
                icon={BiPhoneCall}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Custo por hora"
                name="cost_per_hour"
                placeholder="Ex: 10.00"
                onChange={handleOnChange}
                value={formData.cost_per_hour}
                required
                icon={BiMoney}
              />
            </FieldDefault>
          </FieldGroupFormDefault>

          <FieldGroupFormDefault>
            <FieldDefault>
              <InputDefault
                label="Senha"
                name="password"
                onChange={handleOnChange}
                value={formData.password ?? ''}
                type="password"
                placeholder="xxxxxxx"
                icon={BiKey}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Confirme senha"
                name="confirmPassword"
                onChange={handleOnChange}
                value={formData.confirmPassword ?? ''}
                type="password"
                placeholder="xxxxxxx"
                icon={BiKey}
              />
            </FieldDefault>
          </FieldGroupFormDefault>

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
        isOpen={modalWorkDays.isOpen}
        title={modalWorkDays.title}
        onOpenChange={() =>
          setModalWorkDays({
            isOpen: false,
            title: '',
            user: ''
          })
        }
      >
        <ModalWrapper>
          <ModalSubtitle>
            Defina a agenda do usuário, escolha os dias e quantidade de horas que o usuário irá
            trabalhar
          </ModalSubtitle>

          <TabsWrapper>
            <SelectedTab
              onClick={(e: any) => {
                setSelectedTab(e.target.innerText);
              }}
              className={selectedTab === 'Jornada' ? 'active' : ''}
            >
              Jornada
            </SelectedTab>
            <SelectedTab
              onClick={(e: any) => {
                setSelectedTab(e.target.innerText);
              }}
              className={selectedTab === 'Pausas' ? 'active' : ''}
            >
              Pausas
            </SelectedTab>
          </TabsWrapper>

          <CardsWrapper>
            {selectedTab === 'Jornada' && (
              <CardWorkPause className="selected">
                <CardTitleCheck>
                  <CheckboxDefault
                    label=""
                    name="user_selected"
                    onChange={() => ''}
                    checked={false}
                  />
                </CardTitleCheck>

                <CardHours>
                  <DivHour>
                    Início
                    <TimePicker
                      onChange={() => ''}
                      value={'00:00:00'}
                      clearIcon={null}
                      clockIcon={null}
                      locale="pt-BR"
                      disableClock={true}
                      maxDetail="second"
                      disabled={false}
                    />
                  </DivHour>

                  <DivHour>
                    Fim
                    <TimePicker
                      onChange={() => ''}
                      value={'00:00:00'}
                      clearIcon={null}
                      clockIcon={null}
                      locale="pt-BR"
                      disableClock={true}
                      maxDetail="second"
                      disabled={false}
                    />
                  </DivHour>
                </CardHours>
              </CardWorkPause>
            )}

            {/* {selectedTab === 'Pausas' && (
              <>
                <SelectDefault
                  label="Dia"
                  name="tenant_id"
                  placeHolder="Selecione"
                  onChange={(e) => setSelectedBreakDay(e.target.value)}
                  value={selectedBreakDay}
                  alert="Para qual dia deseja criar as pausas?"
                >
                  {workDays?.map((row, index: number) => (
                    <option key={index} value={row.dayName}>
                      {row.dayName}
                    </option>
                  ))}
                </SelectDefault>

                <CardWorkPause key={row.idBreak}>
                  <CardTitleCheck>
                    {row.pauseName}
                    <div className="trash-icon">
                      <BiTrash />
                    </div>
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value: any) => handleTimeChange(index, 'startAt', value)}
                        value={row.startAt}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="second"
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value: any) => handleTimeChange(index, 'endAt', value)}
                        value={row.endAt}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="second"
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>
              </>
            )} */}
          </CardsWrapper>

          {selectedTab === 'Jornada' && (
            <ModalButtons>
              <ButtonDefault typeButton="lightWhite" isOutline>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary">Salvar</ButtonDefault>
            </ModalButtons>
          )}
        </ModalWrapper>
      </ModalDefault>
    </ContainerDefault>
  );
}
