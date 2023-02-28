import { useState, useEffect, useCallback } from 'react';
import { BiBriefcase, BiCalendar, BiEnvelope, BiMoney, BiPhone, BiUser } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { HiOutlineKey} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import {
  FieldFormDefault,
  FieldGroupFormDefault,
} from '../../components/UiElements/styles';
import { useAuth, User } from '../../hooks/AuthContext';
import api from '../../services/api';
import {
  Container,
  HeaderDefault,
  SectionTitleHeaderDefault,
  TitleHeaderDefault,
  SubTitleHeaderDefault,
  ContentPerfil,
  SectionInfoPerfilLeft,
  AvatarInput,
  SectionInfoPerfilRight,
  SectionCustHours,
  SectionActionForm
} from './styles';
import { useToast } from '../../hooks/toast';

interface FormDataProfile {
  profiles: any;
  avatar: string;
  language: string;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  companySince: string;
  office: string;
  costPerhour: string;
}

interface Errors {
  isError: boolean;
  message: string;
}

export default function Profile() {
  const { updateUser, user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: 'um bom texto de error',
  } as Errors);
  const [formData, setFormData] = useState<User>(user);

  const optionsLanguage = [
    {
      id: 1,
      name: 'Português do Brasil',
    },
    {
      id: 2,
      name: 'Inglês',
    },
    {
      id: 3,
      name: 'Francês',
    },
  ];

  function handleInputChange(
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectChange(
    name: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('image', e.target.files[0]);
        api.post("/images/upload", data).then(response => {
          updateUser(response.data.result);
        });

        addToast({
          type: "success",
          title: "Avatar atualizado",
        });
      }
    }, []);

  const handleSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();
      setLoading(true);
      updateUser(formData);
      setLoading(false)
    } catch (e: any) {
      // console.log("Error =>>", e)
      // setLoading(false)
      // addToast({
      //   type: "danger",
      //   title: "ATENÇÃO",
      //   description: e.message,
      // });
    }
  }, [formData])

  return (
    <Container>
      <HeaderDefault>
        <SectionTitleHeaderDefault>
          <TitleHeaderDefault>Meu Perfil</TitleHeaderDefault>
          <SubTitleHeaderDefault>
            Edite e Atualize suas informações pessoais
          </SubTitleHeaderDefault>
        </SectionTitleHeaderDefault>
      </HeaderDefault>

      <ContentPerfil onSubmit={handleSubmit}>
        <SectionInfoPerfilLeft>
          <AvatarInput>
            {!!user.avatar ? (
              <img src={user.avatar} alt="image profile" />
              ) : (
              <BiUser size={180} color="rgb(204, 204, 204)"/>
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
                  name="birthDate"
                  label="Data Nascimento"
                  placeholder="00/00/00"
                  onChange={(event) => handleInputChange('birthDate', event)}
                  value={formData.birthDate}
                 
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
                name="costPerhour"
                label="Custo por hora"
                placeholder="100,00"
                onChange={(event) => handleInputChange('costPerhour', event)}
                value={formData.costPerhour}
               
                icon={BiMoney}
              />
              <span className='custPerHoursInfo'>Não se preocupe, essa informação só sera vísivel para os administradores.</span>
            </SectionCustHours>

            <SectionActionForm>
              <ButtonDefault typeButton="info">
                <HiOutlineKey size={24} color="#fff" />
                Redefinir Senha
              </ButtonDefault>
              <ButtonDefault loading={loading} typeButton="primary" type='submit'>
                <HiOutlineKey size={24} color="#fff" />
                Salvar
              </ButtonDefault>
              <ButtonDefault 
                onClick={() => navigate('/dashboard')}
                typeButton="danger" 
                isOutline
              >
                Cancelar
              </ButtonDefault>
            </SectionActionForm>
          </FieldGroupFormDefault>
  
        </SectionInfoPerfilRight>
      </ContentPerfil>
    </Container>
  );
}
