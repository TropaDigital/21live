/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';

// Hooks
import { useFetch } from '../../../../hooks/useFetch';
import { useToast } from '../../../../hooks/toast';
import useDebouncedCallback from '../../../../hooks/useDebounced';

// Types
import { IProduct, IServices, ServicesProps } from '../../../../types';

// COMPONENTS
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';
import Pagination from '../../../../components/Pagination';
import QuantityCounter from '../../../../components/QuantityCounter';
import CardProductsSelected from '../../../../components/CardProductsSelected';
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import { Table } from '../../../../components/Table';

// STYLES
import { FieldTogleButton, TableHead } from '../../../../components/Table/styles';
import { FieldGroup } from '../../../../components/UiElements/styles';
import { ProductsWrapper, WrapperCard } from './styles';

interface PropsProducts {
  dataOffice: any;
  dataFilter: any;
  handleOnAddProducts: (items: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  handleEditProductQuantity: (value: any) => void;
  handleEditProducthours: (values: any, product: IProduct) => void;
  okToSave: any;
  setSave: any;
  editProducts: boolean;
  hideSwitch: any;
}

export default function InfoProducts({
  dataOffice,
  dataFilter,
  handleOnPeriod,
  handleOnAddProducts,
  handleOnDeleteProduct,
  handleEditProductQuantity,
  handleEditProducthours,
  okToSave,
  setSave,
  editProducts,
  hideSwitch
}: PropsProducts) {
  const { addToast } = useToast();
  const [search, setSearch] = useState<IServices[]>([]);
  const { data, pages } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [typeList, setTypeList] = useState('produtos');
  const [selected, setSelected] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState<any>('');
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: any) => setSearch(search),
    700
  );

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  function handleAddProducts(product: any) {
    if (
      quantityProducts === '' &&
      selectedProducts.filter((obj) => obj.service_id === product.service_id).length > 0
    ) {
      addToast({
        title: 'Atenção',
        description: 'Produto já adicionado, altere a quantidade ao lado',
        type: 'warning'
      });
    } else if (quantityProducts === '') {
      addToast({
        title: 'Atenção',
        description: 'Adicione a quantidade primeiro',
        type: 'warning'
      });
    } else {
      if (selectedProducts.filter((obj) => obj.service_id === product.service_id).length > 0) {
        addToast({
          title: 'Atenção',
          description: 'Produto já adicionado',
          type: 'warning'
        });
        setQuantityProducts('');
      } else {
        setSelectedProducts((obj) => [...obj, quantityProducts]);
        setQuantityProducts('');
      }
    }
  }

  function handleDeleteProducts(id: any) {
    setSelectedProducts(selectedProducts.filter((obj) => obj.service_id !== id.service_id));
    setQuantityProducts('');
  }

  function handleAddHours(value: any, product: IProduct) {
    setSelectedProducts((current) =>
      current.map((obj) => {
        if (obj.service_id === product.service_id) {
          return { ...obj, quantity: value.timeCounter, period: value.contractType };
        }
        return obj;
      })
    );
  }

  function editProductQuantity(product: any) {
    handleEditProductQuantity(product);
  }

  function editProductHours(value: any, product: IProduct) {
    const updatedProduct = {
      description: product.description,
      minutes: product.minutes,
      period: product.period,
      project_id: product.service_id,
      quantity: value.timeCounter,
      service: product.service,
      size: product.size,
      type: product.type
    };
    handleEditProductQuantity(updatedProduct);
  }

  const deleteProducts = (value: any) => {
    handleOnDeleteProduct(value.service_id);
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      okToSave(true);
    }

    if (selectedProducts.length <= 0) {
      okToSave(false);
    }
  }, [selectedProducts]);

  useEffect(() => {
    if (setSave === 'Go') {
      setTimeout(() => {
        selectedProducts.map((row: any) => {
          handleOnAddProducts(row);
        });
      }, 300);
    }
  }, [setSave]);

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
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
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
          {dataFilter && editProducts ? (
            <tbody>
              {dataFilter?.map((row: IProduct) => (
                <tr key={row.service_id}>
                  <td>{row.service_id}</td>
                  <td>{row.service}</td>
                  <td>{row.description}</td>
                  <td>
                    <QuantityCounter
                      handleQuantity={editProductQuantity}
                      rowQuantity={row}
                      clearQuantity={deleteProducts}
                      receiveQuantity={row.quantity}
                    />
                  </td>
                  <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleAddProducts(row)}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td>

                  {/* {quantityProducts &&
                  Object.values(quantityProducts.quantity).includes(row.service_id) ? (
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
                  )} */}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {data?.map((row) => (
                <tr key={row.service_id}>
                  <td>{row.service_id}</td>
                  <td>{row.service}</td>
                  <td>{row.category}</td>
                  <td>
                    <QuantityCounter
                      handleQuantity={setQuantityProducts}
                      rowQuantity={row}
                      clearQuantity={handleDeleteProducts}
                      receiveQuantity={row.quantity}
                    />
                  </td>
                  <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleAddProducts(row)}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td>

                  {/* {quantityProducts && Object.values(quantityProducts).includes(row.service_id) ? (
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
                  )} */}
                </tr>
              ))}
            </tbody>
          )}

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
          {selectedProducts.map((row: IProduct, index: number) => (
            <CardProductsSelected
              handleOnPeriod={handleOnPeriod}
              id={index + 1}
              title={row.service}
              contract_type={''}
              hours_total={(e: any) => handleAddHours(e, row)}
              key={index}
              data={row}
              editing={editProducts}
              showSwitch={hideSwitch}
            />
          ))}
        </WrapperCard>
      )}

      {dataFilter && editProducts && (
        <WrapperCard>
          {dataFilter.map((row: IProduct, index: number) => (
            <CardProductsSelected
              handleOnPeriod={handleOnPeriod}
              id={index + 1}
              title={row.service}
              contract_type={''}
              hours_total={(e: any) => editProductHours(e, row)}
              key={index}
              data={row}
              editing={editProducts}
              showSwitch={hideSwitch}
            />
          ))}
        </WrapperCard>
      )}
    </ProductsWrapper>
  );
}
