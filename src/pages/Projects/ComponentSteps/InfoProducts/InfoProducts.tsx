/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';

// Hooks
import { useFetch } from '../../../../hooks/useFetch';

// Utils
import { multiplyTime } from '../../../../utils/convertTimes';
import { useDebounce } from '../../../../utils/useDebounce';

// Types
import { IServices } from '../../../../types';

// COMPONENTS
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import Pagination from '../../../../components/Pagination';
import QuantityCounter from '../../../../components/QuantityCounter';
import { Table } from '../../../../components/Table';

// STYLES
import { FieldTogleButton, TableHead } from '../../../../components/Table/styles';
import { FieldGroup } from '../../../../components/UiElements/styles';
import { ProductsWrapper } from './styles';

interface ServicesProps {
  service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  created: string;
  updated: string;
  category: string;
  flag: string;
}

interface PropsProducts {
  dataOffice: any;
  dataFilter: any;
  handleOnAddProducts: (items: any) => void;
  handleOnDecrementQtd: (e: any) => void;
  handleOnIncrememtQtd: (e: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  handleInputProduct: (value: any, id: any) => void;
}

interface SelectedProducts {
  quantityOfProduct: number;
  selectedProduct: {
    category: string;
    description: string;
    flag: string;
    minutes: string;
    service: string;
    service_id: string;
    size: string;
    tenant_id: string;
    type: string;
  };
}

export default function InfoProducts({
  dataOffice,
  dataFilter,
  handleOnAddProducts,
  handleOnDecrementQtd,
  handleOnIncrememtQtd,
  handleOnPeriod,
  handleOnDeleteProduct,
  handleInputProduct
}: PropsProducts) {
  const minutesAll = dataFilter.map((obj: any) => multiplyTime(obj.minutes, obj.quantity));

  // function handleOnAddItems(items: any) {
  //   handleOnAddProducts([{ ...items, quantity: 1, period: 'mensal' }]);
  //   setIsOpen(!isOpen);
  //   setSearch([]);
  //   setSearchTerm('');
  // }
  const [search, setSearch] = useState<IServices[]>([]);
  const { data, pages, fetchData } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [isSearching, setSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typeList, setTypeList] = useState('produtos');
  const [selected, setSelected] = useState(1);
  const [quantity, setQuantity] = useState<any>();
  let selectedProducts: SelectedProducts[] = [];

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(
        dataOffice
          .filter((obj: any) => obj.service.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter(
            (object: any) => !dataFilter.find((obj: any) => obj.service_id === object.service_id)
          )
      );
      const handler = setTimeout(() => {
        setSearching(false);
        setIsOpen(true);
      }, 700);
      return () => {
        clearTimeout(handler);
      };
    } else {
      setSearch([]);
      setSearching(false);
      setIsOpen(true);
    }
  }, [debouncedSearchTerm]);

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  function handleAddProducts() {
    if (quantity.quantityOfProduct !== 0) {
      selectedProducts.push(quantity);
      // setQuantity('');
    }
  }

  function handleDeleteProducts(id: any) {
    selectedProducts = selectedProducts.filter(
      (obj) => obj.selectedProduct.service_id === id.service_id
    );
  }

  return (
    <ProductsWrapper>
      <Table>
        <TableHead>
          <FieldGroup style={{ justifyContent: 'flex-start' }}>
            <FieldTogleButton>
              <ButtonDefault
                onClick={() => handleOnTypeList('produtos')}
                typeButton={typeList === 'produtos' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Ver Produtos
              </ButtonDefault>
              <ButtonDefault
                onClick={() => handleOnTypeList('kits')}
                typeButton={typeList === 'kits' ? 'lightWhite' : 'light'}
                style={{ height: '100%', fontSize: '12px' }}
              >
                Ver Kits
              </ButtonDefault>
            </FieldTogleButton>

            <InputDefault
              label=""
              name="search"
              placeholder="Buscar produtos"
              onChange={(event) => setSearchTerm(event.target.value)}
              icon={BiSearchAlt}
              isLoading={isSearching}
              value={searchTerm}
            />
          </FieldGroup>
        </TableHead>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((row) => (
              <tr key={row.service_id}>
                <td>{row.service_id}</td>
                <td>{row.service}</td>
                <td>{row.category}</td>
                <td>
                  <QuantityCounter
                    handleQuantity={setQuantity}
                    rowQuantity={row}
                    clearQuantity={handleDeleteProducts}
                  />
                </td>

                <td style={{ cursor: 'pointer' }} onClick={handleAddProducts}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                    Adicionar
                  </div>
                </td>

                {/* <td style={{ cursor: 'pointer' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#D0D5DD' }}>
                      Adicionar
                    </div>
                  </td> */}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={100}>
                <Pagination
                  total={pages.total}
                  perPage={pages.perPage}
                  currentPage={selected}
                  lastPage={pages.lastPage}
                  onClickPage={(e) => setSelected(e)}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </Table>
    </ProductsWrapper>
  );
}
