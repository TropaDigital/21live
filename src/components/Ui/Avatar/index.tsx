/* eslint-disable import-helpers/order-imports */
// React
// import { useEffect, useState } from 'react';

// Icons
import { BiPlusCircle, BiXCircle } from 'react-icons/bi';

// Any
import * as Popover from '@radix-ui/react-popover';

// Styles
import { Container, SectionAllAvatars } from './styles';

// Components
import AvatarDefault from './avatarDefault';

interface PropsAvatar {
  name: string;
  avatar: any;
  isOnline: boolean;
  user_id: any;
}

interface Props {
  data: PropsAvatar[];
}

export default function Avatar({ data }: Props) {
  // const [avatar, setAvatar] = useState('');
  const latesAvatar = data.slice(0, 4);
  // const allAvatar = data.slice(2, data.length);
  const allAvatar = data;

  return (
    <Container length={latesAvatar.length}>
      <ul>
        {latesAvatar.map((row: any) => (
          <li key={row.name} className={`avatar-ui ${!row.avatar ? 'isAvatar' : ''}`}>
            {row.avatar ? (
              <div
                style={{
                  backgroundImage: `url(https://app.21live.com.br/public/files/user/${row.avatar})`
                }}
                className="image-avatar"
              />
            ) : (
              // <img
              //   src={`https://app.21live.com.br/public/files/user/${row.avatar}`}
              //   alt="profile"
              // />
              <AvatarDefault url={row.avatar} name={row.name} />
            )}
            {/* <img src={avatar} alt="imagem usuario" /> */}
          </li>
        ))}

        {!!allAvatar.length && (
          <SectionAllAvatars>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="IconButtonPopover" aria-label="Update dimensions">
                  <BiPlusCircle />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10
                    }}
                  >
                    <p className="Text" style={{ marginBottom: 10 }}>
                      Usuarios
                    </p>
                    <ul className="listAllAvatars">
                      {allAvatar.map((row) => (
                        <li
                          key={row.user_id}
                          className={`avatar-al ${row.isOnline ? 'isOnline' : ''}`}
                        >
                          {row.avatar ? (
                            <div
                              style={{
                                backgroundImage: `url(https://app.21live.com.br/public/files/user/${row.avatar})`
                              }}
                              className="image-avatar"
                            />
                          ) : (
                            <AvatarDefault url={row.avatar} name={row.name} />
                          )}
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
