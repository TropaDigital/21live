import React, { useCallback, useState } from 'react';
import { BiEnvelope, BiLockAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/AuthContext';
import { useToast } from '../../../hooks/toast';

import logo from '../../../assets/bg.svg';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { FieldFormDefault } from '../../../components/UiElements/styles';

import { AnimationContainer, Background, Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
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

        const { email, password } = formData;

        const data = {
          email,
          password
        };

        await signIn({
          email: data.email,
          password: data.password
        });

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Login realizado com sucesso!'
        });

        window.location.pathname = '/dashboard';

        setLoading(false);
      } catch (e: any) {
        console.log('Error =>>', e);
        setLoading(false);
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
    },
    [signIn, addToast, formData, navigate]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <form onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <FieldFormDefault bottom={12}>
              <InputDefault
                name="email"
                icon={BiEnvelope}
                type="text"
                placeholder="E-mail"
                label="E-mail"
                onChange={(e) => handleInputChange('email', e)}
                value={formData.email}
              />
            </FieldFormDefault>

            <FieldFormDefault>
              <InputDefault
                name="password"
                icon={BiLockAlt}
                type="password"
                placeholder="Senha"
                label="Senha"
                onChange={(e) => handleInputChange('password', e)}
                value={formData.password}
              />
            </FieldFormDefault>

            <FieldFormDefault>
              <ButtonDefault loading={loading} type="submit">
                Entrar
              </ButtonDefault>
            </FieldFormDefault>

            {/* <Link to="/forgot-password">Esqueci minha senha</Link> */}
          </form>

          {/* <Link to="/cadastrar">
            <BiLogIn />
            Criar conta
          </Link> */}
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
}
