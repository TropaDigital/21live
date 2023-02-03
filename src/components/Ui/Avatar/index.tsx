import { useEffect, useState } from 'react';
import { BiPlusCircle, BiUser, BiXCircle } from 'react-icons/bi';
import * as Popover from '@radix-ui/react-popover';

import { Container, SectionAllAvatars } from './styles';

interface PropsAvatar {
  name: string;
  url: any;
  isOnline: boolean;
  id: any;
}

interface Props {
  data: PropsAvatar[];
}

export default function Avatar({ data }: Props) {
  const [avatar, setAvatar] = useState('');
  const latesAvatar = data.slice(0, 4);
  const allAvatar = data.slice(2, data.length);
  
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const response = await fetch('https://api.github.com/users/Raafa1993');
    const body = await response.json();
    setAvatar(body.avatar_url);
  }
  
  return (
    <Container length={latesAvatar.length}>
      <ul>
        {latesAvatar.map((row: any) => (
          <li
            key={row.name}
            className={`avatar-ui ${row.isOnline ? 'isOnline' : ''} ${!row.url ? 'isAvatar' : ''}`}
          >
            {!!row.url ? (
              <img src={row.url} alt="profile" />
              ) : (
              <BiUser size={22} color='#ced4da'/>
            )}
            {/* <img src={avatar} alt="imagem usuario" /> */}
          </li>
        ))}

        {!!allAvatar.length && (
          <SectionAllAvatars>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  className="IconButtonPopover"
                  aria-label="Update dimensions"
                >
                  <BiPlusCircle />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <p className="Text" style={{ marginBottom: 10 }}>
                      Usuarios
                    </p>
                    <ul className="listAllAvatars">
                      {allAvatar.map((row) => (
                        <li
                          key={row.id}
                          className={`avatar-al ${
                            row.isOnline ? 'isOnline' : ''
                          }`}
                        >
                          <img src={avatar} alt="imagem usuario" />
                          <h2>{row.name}</h2>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Popover.Close className="PopoverClose" aria-label="Close">
                    <BiXCircle />
                  </Popover.Close>
                  <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </SectionAllAvatars>
        )}
      </ul>
    </Container>
  );
}
