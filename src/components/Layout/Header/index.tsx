import { useState } from 'react';
import { BiLogOut, BiUser } from 'react-icons/bi';
import { FiMenu, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/AuthContext';
import { LogoIcon } from '../../assets/icons';
import {
  Container,
  SectionProfile,
  ButtonConfigProfile,
  IconGear,
  Profile,
  ImageProfile,
  Logo,
  ButtonBurguer,
  SectionPopUpHeader
} from './styles';

interface HeaderProps {
  handleOnMenu: () => void;
  modalActive: boolean;
}

export default function Header({ handleOnMenu, modalActive }: HeaderProps) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [menuUser, setMenuUser] = useState(false);

  return (
    <Container>
      <SectionProfile>
        <Logo modalActive={modalActive}>
          <LogoIcon />
          <ButtonBurguer
            modalActive={modalActive}
            onClick={handleOnMenu}
          >
            {modalActive ? (
              <FiMenu />
            ) : (
              <FiXCircle />
            )}
          </ButtonBurguer>
        </Logo>

        <Profile onClick={() => setMenuUser(!menuUser)}>
          <ButtonConfigProfile>
            <IconGear />
          </ButtonConfigProfile>
          <h2>{user.name}</h2>
          <ImageProfile onClick={() => setMenuUser(!menuUser)}>
            {!!user.avatar ? (
              <img src={user.avatar} alt="profile" />
              ) : (
              <BiUser size={26} color='#fff'/>
            )}
          </ImageProfile>
        </Profile>

      </SectionProfile>

      <SectionPopUpHeader menuUser={menuUser}>
        <ul>
          <li>
            <button 
              onClick={() => {
                navigate("/perfil");
                setMenuUser(false);
              }}
            >
              <BiUser size={24} color="#6C757D" />
              Meu perfil
            </button>
          </li>
          <li>
            <button onClick={signOut}>
              <BiLogOut size={24} color="#6C757D" />
              Sair
            </button>
          </li>
        </ul>
      </SectionPopUpHeader>

    </Container>
  )
}