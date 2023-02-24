import Mentions from './Mentions';
import { Container } from './styles';

interface PropsWrapper {
  handleOnDescription: (value: any) => void;
  value: any;
  mentionData: any;
}

export default function WrapperEditor({ mentionData, value, handleOnDescription }: PropsWrapper) {

  return (
    <Container>
      <Mentions handleOnDescription={(e) => handleOnDescription(e)} value={value} mentionData={mentionData} />
      {/* <Details description={description} /> */}
    </Container>
  );
}
