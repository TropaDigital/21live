import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderContainer } from './styles';

export default function Loader() {
  return (
    <LoaderContainer>
      <MagnifyingGlass
        visible={true}
        height="130"
        width="130"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#cbf0fc"
        color="#101828"
      />
    </LoaderContainer>
  );
}
