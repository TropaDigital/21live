import { BiMinus, BiPlus } from "react-icons/bi";
import { Container, Content } from "./styles";
import { useCallback, useState } from "react";
import Radio from "../../Inputs/InputRadioDefault";
import { multiplyTime } from "../../../utils/convertTimes";

interface ProductsProps {
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any) => void;
  data: any;
}

export default function Addproducts({ data, handleOnDecrementQtd, handleOnIncrememtQtd, handleOnPeriod }: ProductsProps) {


  return (
    <Container>
      <Content>
        <div className="postsInfo">
          <h2>{data.service}</h2>

          <div className="quantityAndHours">
            <div className="boxInfopost">
              <span>horas estimadas: <strong>{data.quantity ? multiplyTime(data.minutes, data.quantity) : '00:00:00' }</strong></span>
            </div>

            <div className="boxInfopost">
              <Radio 
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
              />
            </div>
          </div>
        </div>

        <div className="countPost">
          <button
            type="button"
            onClick={handleOnDecrementQtd}
            disabled={data.quantity <= 0 ? true : false}
          >
            <BiMinus color="#0046B5" />
          </button>

          <div className="resultCountPost">
            {data.quantity ?? 0}
          </div>

          <button
            type="button"
            onClick={handleOnIncrememtQtd}
          >
            <BiPlus color="#0046B5" />
          </button>
        </div>
      </Content>
    </Container>
  )
}
