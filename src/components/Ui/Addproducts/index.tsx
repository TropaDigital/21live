import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Container, Content } from "./styles";
import { useCallback, useState } from "react";
import Radio from "../../Inputs/InputRadioDefault";
import { multiplyTime } from "../../../utils/convertTimes";
import ButtonDefault from "../../Buttons/ButtonDefault";
import InputSwitchDefault from "../../Inputs/InputSwitchDefault";

interface ProductsProps {
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any) => void;
  handleOnDeleteProduct: (item: any) => void;
  data: any;
}

export default function Addproducts({ data, handleOnDecrementQtd, handleOnIncrememtQtd, handleOnPeriod, handleOnDeleteProduct }: ProductsProps) {

  console.log(data.quantity)

  return (
    <Container>
      <Content>
        <div className="cardInfoProductsProject">
          <h2>{data.service}</h2>
          <div className="boxInfopost">
            <span>horas estimadas: <strong>{data.quantity ? multiplyTime(data.minutes, data.quantity) : '00:00:00' }</strong></span>
          </div>
          <div className="boxInfopost">
            <span>horas estimadas: <strong>{data.quantity ? multiplyTime(data.minutes, data.quantity) : '00:00:00' }</strong></span>
          </div>
        </div>

        <div className="boxInfoMonthlyOrYearly">
          <span>Mensal</span>
          <InputSwitchDefault
            onChange={(e) => console.log("SWEET =>", e)}
            // disabled
          />
          <span>Anual</span>

          {/* <Radio 
            onChange={(e) => handleOnPeriod(e)}
            value={data.period}
            name={data.description}
            options={[
              {
                label: 'Mensal',
                value: 'mensal'
              },
              {
                label: 'Anual',
                value: 'anual'
              },
            ]}
          /> */}
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
              {!!data.quantity ? data.quantity : 0 }
            </div>

            <button
              type="button"
              onClick={handleOnIncrememtQtd}
            >
              <BiPlus color="#0046B5" />
            </button>
          </div>
          <ButtonDefault 
            typeButton="danger"
            onClick={handleOnDeleteProduct}
          >
            <BiTrash />
          </ButtonDefault>
        </div>

      </Content>
    </Container>
  )
}
