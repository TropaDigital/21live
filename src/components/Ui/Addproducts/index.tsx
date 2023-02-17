import { BiMinus, BiPlus } from "react-icons/bi";
import { Container, Content } from "./styles";
import { useCallback, useState } from "react";

interface ProductsProps {
  // handleOnDecrementQtd: () => void;
  // handleOnIncrememtQtd: () => void;
  data: any;
}

export default function Addproducts({ data }: ProductsProps) {
  const [count, setCount] = useState(data.qtd)

  const handleOnDecrementQtd = useCallback(() => {
    setCount(count - 1);
  }, [setCount, count])

  const handleOnIncrememtQtd = useCallback(() => {
    setCount(count + 1);
  }, [setCount, count])

  return (
    <Container>
      <Content>
        <div className="postsInfo">
          <h2>POSTS</h2>

          <div className="quantityAndHours">
            <div className="boxInfopost">
              <span>Qtd: <strong>{count ?? 0}</strong></span>
            </div>

            <div className="boxInfopost">
              <span>horas estimadas: <strong>60:00</strong></span>
            </div>
          </div>
        </div>

        <div className="countPost">
          <button
            type="button"
            onClick={handleOnDecrementQtd}
          >
            <BiMinus color="#0046B5" />
          </button>

          <div className="resultCountPost">
            {count}
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
