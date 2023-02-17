import { BiPlus } from 'react-icons/bi'

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import Addproducts from '../../../components/Ui/Addproducts';

import { ContainerInfoProducts } from './styles'
import { useCallback, useState } from 'react';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { useFetch } from '../../../hooks/useFetch';

export default function InfoProducts() {
  const [isOpen, setIsOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    qtd: 0,
    hours: '',
  })

  // const { data: dataOffice } = useFetch<OfficeProps[]>(`services`);

  const [fakeData, setFakeData] = useState<any>([
    {
      id: 1,
      qtd: 20,
    },
    {
      id: 2,
      qtd: 15,
    },
    {
      id: 3,
      qtd: 10,
    }
  ])

  const addProducts = useCallback(() => {
    const newData = {id: fakeData.length + 1, qtd: 15}
    setFakeData([...fakeData, newData])
  }, [setFakeData, fakeData])

  console.log('fakeData', fakeData)

  return (
    <ContainerInfoProducts>
      <ButtonDefault 
        style={{ width: '100%' }}
        isDashed
        isOutline
        typeButton='light'
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiPlus />
        Clique para adicionar um produto
      </ButtonDefault>

      <ul>
        {fakeData.map((row: any) => (
          <Addproducts
            key={row.id}
            data={row}
          />
        ))}
      </ul>

      {/* <ButtonDefault 
        style={{ width: '100%' }}
        isDashed
        isOutline
        typeButton='light'
        onClick={addProducts}
      >
        <BiPlus />
        Adicionar Produto
      </ButtonDefault> */}

      <ModalDefault
        title='Adicionar Produtos'
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <ButtonDefault>
          Salvar
        </ButtonDefault>
      </ModalDefault>
    </ContainerInfoProducts>
  )
}
