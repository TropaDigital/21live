import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiEnvelope, BiLeftArrowAlt, BiLockAlt, BiLogIn, BiUser } from 'react-icons/bi';

import { useAuth } from '../../../hooks/AuthContext';
import { useToast } from '../../../hooks/toast';

import { InputDefault } from '../../../components/Inputs/InputDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

import logo from '../../../components/assets/bg.svg';
import { Container, Content, AnimationContainer, Background } from "./styles";
import { FieldFormDefault } from '../../../components/UiElements/styles';
import api from '../../../services/api';
import getVaidationErrors from '../../../utils/getVaidationErrors';

interface SignInFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
}

export default function SignUp() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  function handleInputChange(name: string, event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();
        setLoading(true);

        const { name, email, password, username, confirmPassword } = formData;

        const data = {
          email,
          password,
          confirmPassword,
          organization_id: "850",
          tenant_id: "0",
          username,
          name,
          downlimit: "0",
          need_fill: "0",
          askpswd: "0"
        };

       await api.post("login/create", data);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Usuário com sucesso!',
        });

        navigate('/login');

        setLoading(false);
      } catch (e: any) {
        const errors = getVaidationErrors(e.response.data.result);

        console.log('Error =>>', errors);
        setLoading(false);
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.result[0].error,
        });
      }
    },
    [signIn, addToast, formData, navigate]
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <form onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <FieldFormDefault bottom={12}>
              <InputDefault 
                name="name" 
                icon={BiUser} 
                type="text" 
                placeholder="Nome"
                label='Nome'
                onChange={(event) => handleInputChange('name', event)}
              />
            </FieldFormDefault>

            <FieldFormDefault bottom={12}>
              <InputDefault 
                name="username" 
                icon={BiUser} 
                type="text" 
                placeholder="username"
                label='Username'
                onChange={(event) => handleInputChange('username', event)}
              />
            </FieldFormDefault>

            <FieldFormDefault bottom={12}>
              <InputDefault
                name="email"
                icon={BiEnvelope}
                type="text"
                placeholder="E-mail"
                label='Email'
                onChange={(event) => handleInputChange('email', event)}
              />
            </FieldFormDefault>

            <FieldFormDefault>
              <InputDefault
                name="password"
                icon={BiLockAlt}
                type="password"
                placeholder="Senha"
                label='Senha'
                onChange={(event) => handleInputChange('password', event)}
              />
            </FieldFormDefault>

            {/* <FieldFormDefault>
              <InputDefault
                name="confirmPassword"
                icon={FiLock}
                type="password"
                placeholder="Confirme Senha"
                label='Confirme Senha'
                onChange={(event) => handleInputChange('confirmPassword', event)}
              />
            </FieldFormDefault> */}

            <FieldFormDefault>
              <ButtonDefault loading={loading} type="submit">
                Cadastrar
              </ButtonDefault>
            </FieldFormDefault>
          </form>

          <Link to="/login">
            <BiLeftArrowAlt />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}
