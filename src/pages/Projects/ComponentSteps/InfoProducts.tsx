import { useEffect, useState } from 'react';
import { BiPlus, BiSearchAlt } from 'react-icons/bi'

// TYPES
import { IServices } from '../../../types';

// UTILS
import { multiplyTime, sumTimes } from '../../../utils/convertTimes';
import { useDebounce } from '../../../utils/useDebounce';

// COMPONENTS
import Addproducts from '../../../components/Ui/Addproducts';
import Collapsi from '../../../components/Ui/Collapsible.tsx';
import { InputDefault } from '../../../components/Inputs/InputDefault';

// STYLES
import { 
  ContainerInfoProducts, 
  SectionProductsProject,
  BoxProductProject,
} from './styles'

interface PropsProducts {
  dataOffice: any;
  dataFilter: any;
  handleSelectItem: (e: any) => void;
  handleOnAddProducts: (items: any) => void;
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  selectedItems: any;
}

export default function InfoProducts({ 
  dataOffice, 
  dataFilter, 
  handleOnAddProducts, 
  handleOnDecrementQtd,
  handleOnIncrememtQtd,
  handleOnPeriod,
  handleOnDeleteProduct
}: PropsProducts) {
  const minutesAll = dataFilter.map((obj: any) => multiplyTime(obj.minutes, obj.quantity))

  function handleOnAddItems(items: any) {
    handleOnAddProducts( [{...items, quantity: 1, period: 'mensal'}])
    setIsOpen(!isOpen)
    setSearch([])
    setSearchTerm('')
  }

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState<IServices[]>([]);
  const [isSearching, setSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(
        dataOffice.filter((obj: any) => obj.service.toLowerCase().includes(searchTerm.toLowerCase())).filter(
          (object: any) => !dataFilter.find((obj: any) => obj.service_id === object.service_id)
        )
      );
      const handler = setTimeout(() => {
        setSearching(false);
        setIsOpen(true)
      }, 700);
      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearch([])
      setSearching(false);
      setIsOpen(true)
    }
  }, [debouncedSearchTerm]);


  return (
    <ContainerInfoProducts>
      <InputDefault
        label="Buscar produtos"
        name="search"
        placeholder="Busque pelo nome..."
        onChange={(event) => setSearchTerm(event.target.value)}
        icon={BiSearchAlt}
        isLoading={isSearching}
        value={searchTerm}
      />

        <Collapsi
          open={isOpen}
          onOpenChange={() => setIsOpen(!isOpen)}
        >
          <SectionProductsProject>
            {search?.map((row) => (
              <BoxProductProject
                key={row.service_id}
                type='button'
                onClick={() => handleOnAddItems(row)}
              >
                <div className="headerProductProject">
                  <h3>{row.service}</h3>

                  <div className="boxAdd">
                    <BiPlus color='#0045B5' />
                  </div>

                </div>
                <div className="quantityAndHours">
                  <div className="boxInfopost">
                    <span>Horas estimadas: <strong>{sumTimes([row.minutes])}</strong></span>
                  </div>

                  <div className="boxInfopost">
                    <span>Categoria: <strong>{row.type}</strong></span>
                  </div>
                </div>
              </BoxProductProject>
            ))}
          </SectionProductsProject>
        </Collapsi>

        <ul>
          {dataFilter?.map((row: any) => (
            <Addproducts
              key={row.service_id}
              data={row}
              handleOnDecrementQtd={() => handleOnDecrementQtd(row)} 
              handleOnIncrememtQtd={() => handleOnIncrememtQtd(row)}
              handleOnPeriod={(e) => handleOnPeriod(e, row.service_id)}
              handleOnDeleteProduct={() => handleOnDeleteProduct(row.service_id)}
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
    </ContainerInfoProducts>
  )
}
