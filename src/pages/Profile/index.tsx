/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { BiBriefcase, BiCalendar, BiEnvelope, BiMoney, BiPhone, BiUser } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { HiOutlineKey } from 'react-icons/hi';

// Services
import api from '../../services/api';

// Hooks
import { useAuth, User } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/toast';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { FieldFormDefault, FieldGroupFormDefault } from '../../components/UiElements/styles';

// Styles
import {
  AvatarInput,
  Container,
  ContentPerfil,
  HeaderDefault,
  SectionActionForm,
  SectionCustHours,
  SectionInfoPerfilLeft,
  SectionInfoPerfilRight,
  SectionTitleHeaderDefault,
  SubTitleHeaderDefault,
  TitleHeaderDefault
} from './styles';

// interface Errors {
//   isError: boolean;
//   message: string;
// }

export default function Profile() {
  const { updateUser, user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({
  //   isError: false,
  //   message: 'um bom texto de error'
  // } as Errors);
  const [formData, setFormData] = useState<User>(user);

  const optionsLanguage = [
    {
      id: 1,
      name: 'Português do Brasil'
    },
    {
      id: 2,
      name: 'Inglês'
    },
    {
      id: 3,
      name: 'Francês'
    }
  ];

  function handleInputChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectChange(name: string, event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('image', e.target.files[0]);
        api.post('/images/upload', data).then((response) => {
          updateUser(response.data.result);
        });

        addToast({
          type: 'success',
          title: 'Avatar atualizado'
        });
      }
    },
    [addToast, updateUser]
  );

  const handleSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();
        setLoading(true);
        updateUser(formData);
        setLoading(false);
      } catch (e: any) {
        // console.log("Error =>>", e)
        // setLoading(false)
        // addToast({
        //   type: "danger",
        //   title: "ATENÇÃO",
        //   description: e.message,
        // });
      }
    },
    [formData, updateUser]
  );

  return (
    <Container>
      <HeaderDefault>
        <SectionTitleHeaderDefault>
          <TitleHeaderDefault>Meu Perfil</TitleHeaderDefault>
          <SubTitleHeaderDefault>Edite e Atualize suas informações pessoais</SubTitleHeaderDefault>
        </SectionTitleHeaderDefault>
      </HeaderDefault>

      <ContentPerfil onSubmit={handleSubmit}>
        <SectionInfoPerfilLeft>
          <AvatarInput>
            {user.avatar ? (
              <img src={user.avatar} alt="image profile" />
            ) : (
              <BiUser size={180} color="rgb(204, 204, 204)" />
            )}
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <FieldFormDefault>
            <SelectDefault
              name="language"
              label="Lingua"
              placeholder="Selecione opção abaixo"
              onChange={(event) => handleSelectChange('language', event)}
              value={formData.language}
            >
              {optionsLanguage.map((row) => (
                <option key={row.id} value={row.name}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
          </FieldFormDefault>
        </SectionInfoPerfilLeft>

        <SectionInfoPerfilRight>
          <FieldFormDefault>
            <FieldGroupFormDefault>
              <FieldFormDefault>
                <InputDefault
                  name="name"
                  label="Nome"
                  placeholder="seu nome"
                  onChange={(event) => handleInputChange('name', event)}
                  value={formData.name}
                  style={{ marginBottom: '14px' }}
                  icon={BiUser}
                />

                <InputDefault
                  name="birthday"
                  label="Data Nascimento"
                  placeholder="00/00/00"
                  onChange={(event) => handleInputChange('birthday', event)}
                  value={formData.birthday}
                  style={{ marginBottom: '14px' }}
                  icon={BiCalendar}
                />

                <InputDefault
                  name="companySince"
                  label="Na empresa desde"
                  placeholder="00/00/00"
                  onChange={(event) => handleInputChange('companySince', event)}
                  value={formData.companySince}
                  style={{ marginBottom: '14px' }}
                  icon={BiCalendar}
                />
              </FieldFormDefault>

              <FieldFormDefault>
                <InputDefault
                  name="email"
                  label="E-mail"
                  placeholder="Digite seu email"
                  onChange={(event) => handleInputChange('email', event)}
                  value={formData.email}
                  style={{ marginBottom: '14px' }}
                  icon={BiEnvelope}
                />

                <InputDefault
                  name="phone"
                  label="Telefone"
                  placeholder="(00) 0 0000-0000"
                  onChange={(event) => handleInputChange('phone', event)}
                  value={formData.phone}
                  style={{ marginBottom: '14px' }}
                  icon={BiPhone}
                />

                <InputDefault
                  name="office"
                  label="cargo"
                  placeholder="Seu cargo"
                  onChange={(event) => handleInputChange('office', event)}
                  value={formData.office}
                  style={{ marginBottom: '14px' }}
                  icon={BiBriefcase}
                />
              </FieldFormDefault>
            </FieldGroupFormDefault>
          </FieldFormDefault>

          <FieldGroupFormDefault>
            <SectionCustHours>
              <InputDefault
                name="cost_per_hour"
                label="Custo por hora"
                placeholder="100,00"
                onChange={(event) => handleInputChange('cost_per_hour', event)}
                value={formData.cost_per_hour}
                icon={BiMoney}
              />
              <span className="custPerHoursInfo">
                Não se preocupe, essa informação só sera vísivel para os administradores.
              </span>
            </SectionCustHours>

            <SectionActionForm>
              <ButtonDefault typeButton="info">
                <HiOutlineKey size={24} color="#fff" />
                Redefinir Senha
              </ButtonDefault>
              <ButtonDefault loading={loading} typeButton="primary" type="submit">
                <HiOutlineKey size={24} color="#fff" />
                Salvar
              </ButtonDefault>
              <ButtonDefault onClick={() => navigate('/dashboard')} typeButton="danger" isOutline>
                Cancelar
              </ButtonDefault>
            </SectionActionForm>
          </FieldGroupFormDefault>
        </SectionInfoPerfilRight>
      </ContentPerfil>

      {/* <ModalDefault title="Novo Modelo" isOpen={modal} onOpenChange={setModal}>
        <div className="contentNewModal" style={{ overflowY: 'auto', position: 'relative' }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row: any) => (
            <div
              className="boxItem"
              key={row}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
                gap: '10px',
                padding: '8px',
                border: '1px solid lightGray',
                borderRadius: '4px'
              }}
            >
              <h2
                style={{
                  fontSize: '18px'
                }}
              >
                Nome do Usuario
              </h2>
              <Avatar data={avatarAll} />
            </div>
          ))}
          <div
            className="footerNewModal"
            style={{
              position: 'fixed',
              bottom: '0'
            }}
          >
            <div
              className="footerButtons"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <ButtonDefault onClick={() => setModal(!modal)}>Descartarr</ButtonDefault>
              <ButtonDefault typeButton="dark">Salvar</ButtonDefault>
            </div>
          </div>
        </div>
      </ModalDefault> */}
    </Container>
  );
}
