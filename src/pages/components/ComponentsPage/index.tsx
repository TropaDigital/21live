import { useEffect } from 'react'

import { IconFile } from '../../../components/assets/icons';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { useToast } from '../../../hooks/toast';
import { Container, Content } from './styles';

export default function ComponentsPage() {
  const { addToast } = useToast();

  useEffect(() => {
    getAll();
  }, [])

  function getAll() {
    addToast({
      type: "success",
      title: "Cadastro realizado",
      description: "Formulario cadastrado com sucesso!",
    });
  }

  return (
    <Container>
      <Content>
        <table>
          <thead>
            <tr>
              <th>Tipo do Botao</th>
              <th>Padrão</th>
              <th>Padrão Pequeno</th>
              <th>Padrão Grande</th>
              <th>Outline</th>
              <th>Outline Pequeno</th>
              <th>Outline Grande</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Primary</td>
              <td>
                <ButtonDefault>
                  <IconFile />
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault 
                  sizeButton="small"
                >
                  <IconFile />
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault 
                  sizeButton="big"
                >
                  <IconFile />
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="primary">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault
                  isOutline
                  sizeButton="small"
                  typeButton="primary"
                >
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="primary">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Secundary</td>
              <td>
                <ButtonDefault typeButton="secondary">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="secondary">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="secondary">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="secondary">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault
                  isOutline
                  sizeButton="small"
                  typeButton="secondary"
                >
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault
                  isOutline
                  sizeButton="big"
                  typeButton="secondary"
                >
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Success</td>
              <td>
                <ButtonDefault typeButton="success">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="success">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="success">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="success">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault
                  isOutline
                  sizeButton="small"
                  typeButton="success"
                >
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="success">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Danger</td>
              <td>
                <ButtonDefault typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="small" typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="danger">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Warning</td>
              <td>
                <ButtonDefault typeButton="warning">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="warning">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="warning">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="warning">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault
                  isOutline
                  sizeButton="small"
                  typeButton="warning"
                >
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="warning">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Info</td>
              <td>
                <ButtonDefault typeButton="info">Texto do botao</ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="info">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="info">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="info">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="small" typeButton="info">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="info">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Light</td>
              <td>
                <ButtonDefault typeButton="light">Texto do botao</ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="light">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="light">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="light">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="small" typeButton="light">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="light">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>

            <tr>
              <td>Dark</td>
              <td>
                <ButtonDefault typeButton="dark">Texto do botao</ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="small" typeButton="dark">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault sizeButton="big" typeButton="dark">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline typeButton="dark">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="small" typeButton="dark">
                  Texto do botao
                </ButtonDefault>
              </td>
              <td>
                <ButtonDefault isOutline sizeButton="big" typeButton="dark">
                  Texto do botao
                </ButtonDefault>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
