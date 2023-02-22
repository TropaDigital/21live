import { BiPlus } from 'react-icons/bi'

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import Addproducts from '../../../components/Ui/Addproducts';

import { useCallback, useState } from 'react';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { useFetch } from '../../../hooks/useFetch';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { ContainerInfoProducts, ContainerListproducts } from './styles'
import { FooterModal } from '../../../components/UiElements/styles';
import { OfficeProps } from '../ListProjects';
import { multiplyTime, sumTimes } from '../../../utils/convertTimes';

interface PropsProducts {
  dataOffice: any;
  dataFilter: any;
  handleSelectItem: (e: any) => void;
  handleOnAddProducts: (items: any) => void;
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  selectedItems: any;
}

export default function InfoProducts({ 
  dataOffice, 
  dataFilter, 
  handleOnAddProducts, 
  selectedItems, 
  handleSelectItem,
  handleOnDecrementQtd,
  handleOnIncrememtQtd,
  handleOnPeriod
}: PropsProducts) {
  const [isOpen, setIsOpen] = useState(false)

  const minutesAll = dataFilter.map((obj: any) => multiplyTime(obj.minutes, obj.quantity))

  function handleOnAddItems(items: any) {
    handleOnAddProducts(items)
    setIsOpen(!isOpen)
  }

  console.log('TIME', dataFilter)

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
        {dataFilter?.map((row: any) => (
          <Addproducts
            key={row.service_id}
            data={row}
            handleOnDecrementQtd={() => handleOnDecrementQtd(row)} 
            handleOnIncrememtQtd={() => handleOnIncrememtQtd(row)}
            handleOnPeriod={(e) => handleOnPeriod(e, row.service_id)}
          />
        ))}
      </ul>
      <div className="quantityAndHours">
        <div className="boxInfopost">
          <span>Produtos: <strong>{dataFilter.length}</strong></span>
        </div>

        <div className="boxInfopost">
          <span>Total de horas estimadas: <strong>{sumTimes(minutesAll)}</strong></span>
        </div>
      </div>

      <ModalDefault
        title='Adicionar Produtos'
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <ContainerListproducts>
          <ul>
            {dataOffice?.map((row: any) => (
              <li key={row.service_id}>
                <CheckboxDefault
                  label={row.service}
                  name={row.service}
                  onChange={() => handleSelectItem(row)}
                  checked={selectedItems.filter((obj: any) => obj.service_id === row.service_id).length > 0 ? true : false}
                />
              </li>
            ))}
          </ul>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '12px' }}>
            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => setIsOpen(!isOpen)}
            >
              Cancelar
            </ButtonDefault>

            <ButtonDefault
              typeButton="primary"
              onClick={() => handleOnAddItems(selectedItems)}
            >
              Adicionar produtos
            </ButtonDefault>
          </FooterModal>
        </ContainerListproducts>
      </ModalDefault>
    </ContainerInfoProducts>
  )
}
