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

// Components
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';
import Pagination from '../../../../components/Pagination';
import QuantityCounter from '../../../../components/QuantityCounter';
import CardProductsSelected from '../../../../components/CardProductsSelected';
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import { Table } from '../../../../components/Table';

// Styles
import { FieldTogleButton, TableHead } from '../../../../components/Table/styles';
import { FieldGroup } from '../../../../components/UiElements/styles';
import { ProductsWrapper, WrapperCard } from './styles';

// Libraries
import Switch from 'react-switch';

interface PropsProducts {
  dataOffice: any;
  dataFilter: any;
  handleOnAddProducts: (items: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  handleEditProductQuantity: (value: any) => void;
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
  okToSave,
  setSave,
  editProducts,
  hideSwitch
}: PropsProducts) {
  const { addToast } = useToast();
  const [search, setSearch] = useState<IServices[]>([]);
  const { data, pages } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeList, setTypeList] = useState('produtos');
  const [selected, setSelected] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState<any>('');
  // const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: any) => setSearch(search),
    700
  );

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  function handleAddProducts(product: any) {
    if (dataFilter.filter((obj: any) => obj.service_id === product.service_id).length > 0) {
      handleEditProductQuantity(quantityProducts);
      setQuantityProducts('');
    } else {
      handleOnAddProducts(quantityProducts);
      setQuantityProducts('');
    }
  }

  function editAddedProducts(product: any) {
    if (dataFilter.filter((obj: any) => obj.product_id === product.product_id).length > 0) {
      handleEditProductQuantity(quantityProducts);
      setQuantityProducts('');
    } else {
      // handleOnAddProducts(quantityProducts);
      setQuantityProducts('');
    }
  }

  function handleDeleteProducts(id: any) {
    if (editProducts) {
      handleOnDeleteProduct(id.product_id);
      setQuantityProducts('');
    } else {
      handleOnDeleteProduct(id.service_id);
      setQuantityProducts('');
    }
  }

  // function editProductQuantity(product: any) {
  //   handleEditProductQuantity(product);
  // }

  // function editProductHours(value: any, product: IProduct) {
  //   const updatedProduct = {
  //     description: product.description,
  //     minutes: product.minutes,
  //     period: product.period,
  //     project_id: product.service_id,
  //     quantity: value.timeCounter,
  //     service: product.service,
  //     size: product.size,
  //     type: product.type
  //   };
  //   handleEditProductQuantity(updatedProduct);
  // }

  // const deleteProducts = (value: any) => {
  //   handleOnDeleteProduct(value.service_id);
  // };

  useEffect(() => {
    if (dataFilter.length > 0) {
      okToSave(true);
    }

    // if (selectedProducts.length <= 0) {
    //   okToSave(false);
    // }
  }, [dataFilter]);

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
              isLoading={isLoading}
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
              <th>Listar produtos</th>
              <th>Quantidade</th>
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>
          {dataFilter && editProducts ? (
            <tbody>
              {dataFilter?.map((row: any) => (
                <tr key={row.product_id}>
                  <td>{row.product_id}</td>
                  <td>{row.service}</td>
                  <td>{row.description}</td>
                  <td>
                    <Switch
                      onChange={() => console.log('log switch', row.service_id)}
                      checked={row.flag === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <QuantityCounter
                      handleQuantity={setQuantityProducts}
                      rowQuantity={row}
                      clearQuantity={handleDeleteProducts}
                      receiveQuantity={Number(row.quantity)}
                    />
                  </td>
                  {/* <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleAddProducts(row)}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td> */}

                  {quantityProducts && Object.values(quantityProducts).includes(row.product_id) ? (
                    <td
                      style={{ cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => editAddedProducts(row)}
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
          ) : (
            <tbody>
              {data?.map((row) => (
                <tr key={row.service_id}>
                  <td>{row.service_id}</td>
                  <td>{row.service}</td>
                  <td>{row.category}</td>
                  <td>
                    <Switch
                      onChange={() => console.log('log switch', row.service_id)}
                      checked={row.flag === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <QuantityCounter
                      handleQuantity={setQuantityProducts}
                      rowQuantity={row}
                      clearQuantity={handleDeleteProducts}
                      receiveQuantity={row?.quantity}
                    />
                  </td>
                  {/* <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleAddProducts(row)}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td> */}

                  {quantityProducts && Object.values(quantityProducts).includes(row.service_id) ? (
                    <td
                      style={{ cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => handleAddProducts(row)}
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

      {dataFilter.length > 0 && (
        <WrapperCard>
          {dataFilter.map((row: IProduct, index: number) => (
            <CardProductsSelected
              handleOnPeriod={handleOnPeriod}
              id={index + 1}
              title={row.service}
              contract_type={(e: any) => handleOnPeriod(e, row)}
              key={index}
              data={row}
              showSwitch={hideSwitch}
            />
          ))}
        </WrapperCard>
      )}

      {/* {dataFilter && editProducts && (
        <WrapperCard>
          {dataFilter.map((row: IProduct, index: number) => (
            <CardProductsSelected
              handleOnPeriod={handleOnPeriod}
              id={index + 1}
              title={row.service}
              contract_type={(e: any) => editProductHours(e, row)}
              key={index}
              data={row}
              showSwitch={hideSwitch}
            />
          ))}
        </WrapperCard>
      )} */}
    </ProductsWrapper>
  );
}
