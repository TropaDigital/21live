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
import QuantityInput from '../../../../components/Inputs/QuantityInput';

interface PropsProducts {
  dataFilter: any;
  handleOnAddProducts: (items: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  handleEditProductQuantity: (value: any) => void;
  okToSave: any;
  setSave: any;
  editProducts: boolean;
  editProject: boolean;
  hideSwitch: any;
  tenant_id: string;
}

interface IDataKit {
  title: string;
  description: string;
  serviceslist: ServicesProps[];
  services: string[];
  pack_id: string;
}

export default function InfoProducts({
  dataFilter,
  handleOnPeriod,
  handleOnAddProducts,
  handleOnDeleteProduct,
  handleEditProductQuantity,
  okToSave,
  setSave,
  editProducts,
  editProject,
  hideSwitch,
  tenant_id
}: PropsProducts) {
  const { addToast } = useToast();
  const [search, setSearch] = useState<IServices[]>([]);
  const { data, pages } = useFetch<ServicesProps[]>(
    `services?tenant_id=${tenant_id}&search=${search}`
  );
  const { data: dataKit } = useFetch(`/pack-services?tenant_id=${tenant_id}&search=${search}`);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeList, setTypeList] = useState('produtos');
  const [selected, setSelected] = useState(1);
  const [quantityProducts, setQuantityProducts] = useState<any>('');
  const [currentKitProducts, setCurrentKitProducts] = useState<ServicesProps[]>([]);
  const [productQuantity, setProductQuantity] = useState<{ [key: string]: number }>({});
  // const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: any) => setSearch(search),
    700
  );

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  const handleOnQuantity = (product: any, counter: any) => {
    const productSelected: IProduct = {
      service_id: product.service_id || product.project_id || product.product_id,
      service: product.service,
      description: product.description,
      flag: product.flag,
      type: product.type,
      size: product.size,
      quantity: counter,
      minutes: '' || product.minutes,
      minutes_creation: '' || product.minutes_creation,
      minutes_essay: '' || product.minutes_essay,
      period: '' || product.period
    };
    setQuantityProducts(productSelected);
  };

  function handleAddProducts(product: any) {
    // console.log('log do add product', product);
    if (dataFilter.filter((obj: any) => obj.service_id === product.service_id).length > 0) {
      handleEditProductQuantity(quantityProducts);
      setQuantityProducts('');
    } else {
      handleOnAddProducts(quantityProducts);
      setQuantityProducts('');
    }
  }

  function editAddedProducts(product: any) {
    // console.log('log do produto a ser editado', product);
    if (dataFilter.filter((obj: any) => obj.service_id === product.service_id).length > 0) {
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

  function handleOnAddKit(row: IDataKit): void {
    const { serviceslist } = row;

    setTypeList('kits-products');

    const serviceWithoutTenantId = serviceslist;
    const productsQuantities: { [key: string]: number } = {};

    serviceWithoutTenantId?.forEach((item: ServicesProps) => {
      delete item?.tenant_id;
      delete item?.category;
    });

    setCurrentKitProducts(serviceWithoutTenantId);

    serviceWithoutTenantId.forEach((item: ServicesProps) => {
      const isServiceSelected = dataFilter?.filter(
        (row: ServicesProps) => row?.service_id === item?.service_id
      );

      if (isServiceSelected?.length && isServiceSelected[0].quantity >= 1) {
        item.quantity = isServiceSelected[0].quantity++;
        return handleEditProductQuantity(isServiceSelected[0]);
      }

      if (typeof item.quantity === 'undefined') item.quantity = 0;
      item.quantity++;

      item.quantity > 1 ? handleEditProductQuantity(item) : handleOnAddProducts(item);
      productsQuantities[item.service] = item?.quantity;
    });

    addToast({
      type: 'success',
      title: 'Kit adicionado com sucesso!'
    });

    setProductQuantity({ ...productQuantity, ...productsQuantities });
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
    // console.log('log do dataFilter', dataFilter);
    // if (selectedProducts.length <= 0) {
    //   okToSave(false);
    // }
  }, [dataFilter]);

  const tableHeaders: { [key: string]: string[] } = {
    produtos: ['ID', 'Produto', 'Categoria', 'Status', 'Quantidade'],
    ['kits-select']: ['ID', 'Kit', 'Qtd. Produtos', 'Descrição'],
    ['kits-products']: ['ID', 'Produto', 'Categoria', 'Status', 'Quantidade']
  };

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
                onClick={() => handleOnTypeList('kits-select')}
                typeButton={
                  typeList === 'kits-select' || typeList === 'kits-products'
                    ? 'lightWhite'
                    : 'light'
                }
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
              {tableHeaders[typeList]?.map((item) => (
                <th key={item}>{item}</th>
              ))}
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>
          {dataFilter.length > 0 && editProducts ? (
            <tbody>
              {dataFilter?.map((row: any) => (
                <tr key={row.service_id}>
                  <td>{row.service_id}</td>
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
                    {/* <QuantityInput
                      receiveQuantity={row.quantity ? 1 : 0}
                      infosReceived={row}
                      handleQuantity={(value: any) => handleOnQuantity(row, value)}
                      clearQuantity={() => setQuantityProducts('')}
                      disabledInput={false}
                    /> */}
                    <QuantityCounter
                      handleQuantity={setQuantityProducts}
                      rowQuantity={row.quantity}
                      clearQuantity={handleDeleteProducts}
                      receiveQuantity={Number(row.quantity)}
                      editProject={editProject}
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
              {typeList === 'produtos' &&
                data?.map((row) => (
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
                      <QuantityInput
                        receiveQuantity={row.quantity ? 1 : 0}
                        infosReceived={row}
                        handleQuantity={(value: any) => handleOnQuantity(row, value)}
                        clearQuantity={() => {
                          setQuantityProducts('');
                          handleDeleteProducts(row);
                        }}
                        disabledInput={false}
                      />
                      {/* <QuantityCounter
                        handleQuantity={setQuantityProducts}
                        rowQuantity={row}
                        clearQuantity={handleDeleteProducts}
                        receiveQuantity={row?.quantity}
                      /> */}
                    </td>
                    {/* <td
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleAddProducts(row)}
                  >
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                      Adicionar
                    </div>
                  </td> */}

                    {quantityProducts &&
                    Object.values(quantityProducts).includes(row.service_id) ? (
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

              {typeList === 'kits-select' &&
                (dataKit as IDataKit[])?.map((row) => (
                  <tr key={row?.pack_id}>
                    <td>{row?.pack_id}</td>
                    <td>{row?.title}</td>
                    <td>{row?.services?.length}</td>
                    <td>{row?.description}</td>
                    <td
                      style={{ cursor: 'pointer', textAlign: 'center' }}
                      onClick={() => handleOnAddKit(row)}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#0045B5' }}>
                        Adicionar
                      </div>
                    </td>
                  </tr>
                ))}

              {typeList === 'kits-products' &&
                currentKitProducts?.map((row) => (
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

                    {quantityProducts &&
                    Object.values(quantityProducts).includes(row.service_id) ? (
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
