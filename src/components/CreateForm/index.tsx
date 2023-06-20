import { InputDefault } from '../Inputs/InputDefault';
import { Container, Form, FormLine, FormTitle, ProjectWrapper } from './styles';

interface CreateProps {
  isTask?: boolean;
}

interface FormProps {
  title: string;
  client_id: any;
  fee_spot: boolean;
  contract_type: string;
  date_start: string;
  date_end: string;
}

export default function CreateForm({ isTask }: CreateProps) {
  return (
    <Container>
      {!isTask && (
        <ProjectWrapper>
          <FormTitle>Geral</FormTitle>
          <Form>
            <FormLine>
              <InputDefault
                label="Título do projeto/contrato"
                placeholder="Titulo da tarefa"
                name="title"
                onChange={() => ''}
                value={'teste'}
                alert="Titulo é obrigatório"
                // error={errors?.title}
              />
            </FormLine>
          </Form>
        </ProjectWrapper>
      )}

      {isTask && <div>Criar Task</div>}
    </Container>
  );
}
