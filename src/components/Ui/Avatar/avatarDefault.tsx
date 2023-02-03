import { memo } from 'react'
import { BiUser } from 'react-icons/bi';
import { ContainerAvatar } from './styles';

interface Props {
  url: string | null;
  name?: any;
}

function AvatarDefault({ url, name }: Props) {
  function nameDisplay(name: string) {
    const str = name.replace(/[^a-zA-Z\s]/g, '');
    const firstName = str.split(' ')[0];
    const lastName = str.split(' ').filter((elem: any) => elem.trim().length > 0).slice(-1).join('');
    const concatName = firstName[0] + ' ' + (!!lastName[0] ? lastName[0] : '')
    return concatName
  }

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <ContainerAvatar isImage={!url}>
      <div className="avatarDefault">
        {!!url ? (
          <img src={`https://app.21live.com.br/public/files/user/${url}`} alt="profile" />
          ) : (
            <div className="avatarBadg" style={{ backgroundColor: generateRandomColor() }}>
              {nameDisplay(name)}
              {/* <BiUser size={22} color='#fff'/> */}
            </div>
        )}

      </div>
    </ContainerAvatar>
  )
}

export default memo(AvatarDefault)