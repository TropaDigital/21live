import { BiMinus, BiPlus } from 'react-icons/bi';

import { multiplyTime } from '../../../utils/convertTimes';

import ButtonTable from '../../Buttons/ButtonTable';
import InputSwitchDefault from '../../Inputs/InputSwitchDefault';
import { Container, Content } from './styles';

interface ProductsProps {
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any) => void;
  handleOnDeleteProduct: (item: any) => void;
  handleInputProduct: (value: any) => void;
  data: any;
}

export default function Addproducts({
  data,
  handleOnDecrementQtd,
  handleInputProduct,
  handleOnIncrememtQtd,
  handleOnPeriod,
  handleOnDeleteProduct
}: ProductsProps) {
  const verifyPeriod = data.period === 'mensal' ? false : true;

  return (
    <Container>
      <Content>
        <div className="cardInfoProductsProject">
          <h2>{data.service}</h2>
          <div className="boxInfopost">
            <span>
              horas estimadas:{' '}
              <strong>
                {data.quantity
                  ? multiplyTime(data.minutes, data.quantity)
                  : '00:00:00'}
              </strong>
            </span>
          </div>
          <div className="boxInfopost">
            <span>
              Categoria: <strong>{data.type}</strong>
            </span>
          </div>
        </div>

        <div className="boxInfoMonthlyOrYearly">
          <span>Mensal</span>
          <InputSwitchDefault
            onChange={(e) => handleOnPeriod(e.target.checked)}
            value={String(verifyPeriod)}
          />
          <span>Anual</span>
        </div>

        <div className="boxRightProducts">
          <div className="countPost">
            <button
              type="button"
              onClick={handleOnDecrementQtd}
              disabled={data.quantity <= 0 ? true : false}
            >
              <BiMinus color="#0046B5" />
            </button>

            <div className="resultCountPost">
              <input
                type="text"
                value={data.quantity}
                onChange={(event) => handleInputProduct(event)}
                className="inputProducts"
              />
            </div>

            <button type="button" onClick={handleOnIncrememtQtd}>
              <BiPlus color="#0046B5" />
            </button>
          </div>

          <ButtonTable typeButton="delete" onClick={handleOnDeleteProduct} />
        </div>
      </Content>
    </Container>
  );
}
