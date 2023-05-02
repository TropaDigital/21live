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
import { ProductsWrapper, WrapperCard } from './styles';
import CardProductsSelected from '../../../../components/CardProductsSelected';

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
  quantitySelected: number;
  rowQuantity: {
    service_id: number;
    service: string;
    description: string;
    type: string;
    size: string;
    minutes: string;
    flag: string;
    tenant_id: string;
    category: string;
    quantity: number;
  };
}

export default function InfoProducts({
  dataOffice,
  dataFilter,
  handleOnPeriod,
  handleOnAddProducts,
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
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([]);

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
    if (quantity.quantitySelected !== 0) {
      setSelectedProducts((obj) => [...obj, quantity]);
    }
  }

  function handleDeleteProducts(id: any) {
    setSelectedProducts(
      selectedProducts.filter((obj) => obj.rowQuantity.service_id !== id.service_id)
    );
    setQuantity('');
  }

  useEffect(() => {
    // console.log('log do quantity', quantity);
    // console.log('log do array selected', selectedProducts);
  }, [selectedProducts]);

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

                {quantity && Object.values(quantity.rowQuantity).includes(row.service_id) ? (
                  <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={handleAddProducts}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td>
                ) : (
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#D0D5DD' }}>
                      Adicionar
                    </div>
                  </td>
                )}
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

      {selectedProducts.length > 0 && (
        <WrapperCard>
          {selectedProducts.map((row: SelectedProducts, index: number) => (
            <CardProductsSelected
              handleOnPeriod={handleOnPeriod}
              id={index + 1}
              title={row.rowQuantity.service}
              contract_type={'mensal'}
              hours_total={0}
              key={index}
              data={row.rowQuantity}
            />
          ))}
        </WrapperCard>
      )}
    </ProductsWrapper>
  );
}
