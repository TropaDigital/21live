/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';

// Hooks
import { useFetch } from '../../../../hooks/useFetch';
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
import QuantityInput from '../../../../components/Inputs/QuantityInput';

// Styles
import { FieldTogleButton, TableHead } from '../../../../components/Table/styles';
import { FieldGroup } from '../../../../components/UiElements/styles';
import { ModalButton, ProductsWrapper, WrapperCard } from './styles';

// Libraries
import Switch from 'react-switch';
import ModalDefault from '../../../../components/Ui/ModalDefault';
import { MdClose } from 'react-icons/md';

interface PropsProducts {
  dataFilter: any;
  handleOnAddProducts: (items: any) => void;
  handleOnPeriod: (e: any, id: any) => void;
  handleOnDeleteProduct: (id: any) => void;
  handleEditProductQuantity: (value: any) => void;
  okToSave: any;
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
  editProducts,
  hideSwitch,
  tenant_id
}: PropsProducts) {
  const [search, setSearch] = useState<IServices[]>([]);
  const [selected, setSelected] = useState(1);
  const { data, pages } = useFetch<ServicesProps[]>(
    `services?tenant_id=${tenant_id}&search=${search}&page=${selected}`
  );
  const { data: dataKit, pages: pagesKit } = useFetch(
    `/pack-services?tenant_id=${tenant_id}&search=${search}&page=${selected}`
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [typeList, setTypeList] = useState('produtos');
  const [quantityProducts, setQuantityProducts] = useState<any>('');
  const [currentKitProducts, setCurrentKitProducts] = useState<ServicesProps[]>([]);
  const [productQuantity, setProductQuantity] = useState<{ [key: string]: number }>({});
  const [productsModal, setProductsModal] = useState<boolean>(false);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: any) => setSearch(search),
    700
  );

  // useEffect(() => {
  //   data?.forEach((obj) => {
  //     obj.quantity = 0;
  //   });
  //   console.log('log do data with quantity', data);
  // }, [data]);

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  const handleOnQuantity = (product: any, counter: any) => {
    const productSelected: IProduct = {
      job_service_id: product.job_service_id || product.project_id || product.project_product_id,
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
    if (dataFilter.filter((obj: any) => obj.job_service_id === product.job_service_id).length > 0) {
      handleEditProductQuantity(quantityProducts);
      setQuantityProducts('');
    } else {
      handleOnAddProducts(quantityProducts);
      setQuantityProducts('');
    }
  }

  function editAddedProducts(product: any) {
    // console.log('log do produto a ser editado', product);
    if (dataFilter.filter((obj: any) => obj.job_service_id === product.job_service_id).length > 0) {
      handleEditProductQuantity(quantityProducts);
      setQuantityProducts('');
    } else {
      // handleOnAddProducts(quantityProducts);
      setQuantityProducts('');
    }
  }

  function handleDeleteProducts(id: any) {
    handleOnDeleteProduct(id);
    setQuantityProducts('');
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
        (row: ServicesProps) => row?.job_service_id === item?.job_service_id
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

    // addToast({
    //   type: 'success',
    //   title: 'Kit adicionado com sucesso!'
    // });

    setProductQuantity({ ...productQuantity, ...productsQuantities });
  }

  useEffect(() => {
    if (dataFilter.length > 0) {
      okToSave(true);
    }
  }, [dataFilter]);

  const tableHeaders: { [key: string]: string[] } = {
    produtos: ['ID', 'Produto', 'Categoria', 'Produto listável', 'Quantidade'],
    ['kits-select']: ['ID', 'Kit', 'Qtd. Produtos', 'Descrição'],
    ['kits-products']: ['ID', 'Produto', 'Categoria', 'Produto listável', 'Quantidade']
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
            {editProducts && (
              <ButtonDefault typeButton="primary" onClick={() => setProductsModal(true)}>
                {typeList === 'produtos' ? 'Adicionar mais produtos' : 'Adicionar mais kits'}
              </ButtonDefault>
            )}

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
                <tr key={row.job_service_id}>
                  <td>{row.job_service_id}</td>
                  <td>{row.service}</td>
                  <td>{row.description}</td>
                  <td>
                    <Switch
                      onChange={() => ''}
                      checked={row.flag === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <QuantityInput
                      receiveQuantity={row.quantity ? row.quantity : 0}
                      infosReceived={row}
                      handleQuantity={(value: any) => handleOnQuantity(row, value)}
                      clearQuantity={() => handleDeleteProducts(row.job_service_id)}
                      disabledInput={false}
                    />
                  </td>
                  {quantityProducts &&
                  Object.values(quantityProducts).includes(row.job_service_id) ? (
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
                  <tr key={row.job_service_id}>
                    <td>{row.job_service_id}</td>
                    <td>{row.service}</td>
                    <td>{row.category}</td>
                    <td>
                      <Switch
                        onChange={() => ''}
                        checked={row.flag === 'true' ? true : false}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#0046B5"
                      />
                    </td>
                    <td>
                      <QuantityInput
                        receiveQuantity={row.quantity ? row.quantity : 0}
                        infosReceived={row}
                        handleQuantity={(value: any) => handleOnQuantity(row, value)}
                        clearQuantity={() => {
                          setQuantityProducts('');
                          handleDeleteProducts(row.job_service_id);
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
                    Object.values(quantityProducts).includes(row.job_service_id) ? (
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
                  <tr key={row.job_service_id}>
                    <td>{row.job_service_id}</td>
                    <td>{row.service}</td>
                    <td>{row.category}</td>
                    <td>
                      <Switch
                        onChange={() => ''}
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
                        clearQuantity={() => handleDeleteProducts(row.job_service_id)}
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
                    Object.values(quantityProducts).includes(row.job_service_id) ? (
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
              {typeList === 'produtos' && !editProducts && (
                <td colSpan={100}>
                  <Pagination
                    total={pages.total}
                    perPage={pages.perPage}
                    currentPage={selected}
                    lastPage={pages.lastPage}
                    onClickPage={(e) => setSelected(e)}
                  />
                </td>
              )}
              {typeList === 'kits-select' && !editProducts && (
                <td colSpan={100}>
                  <Pagination
                    total={pagesKit.total}
                    perPage={pagesKit.perPage}
                    currentPage={selected}
                    lastPage={pagesKit.lastPage}
                    onClickPage={(e) => setSelected(e)}
                  />
                </td>
              )}
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

      <ModalDefault
        isOpen={productsModal}
        title="Adicionar produtos"
        onOpenChange={() => setProductsModal(false)}
        maxWidth="1150px"
      >
        <div style={{ width: '1050px', marginTop: '-24px' }}>
          <ModalButton onClick={() => setProductsModal(false)}>
            <MdClose />
          </ModalButton>
          <Table>
            <table>
              <thead>
                <tr>
                  {tableHeaders[typeList]?.map((item) => (
                    <th key={item}>{item}</th>
                  ))}
                  <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
                </tr>
              </thead>
              {typeList === 'produtos' &&
                data?.map((row) => (
                  <tr key={row.job_service_id}>
                    <td>{row.job_service_id}</td>
                    <td>{row.service}</td>
                    <td>{row.category}</td>
                    <td>
                      <Switch
                        onChange={() => ''}
                        checked={row.flag === 'true' ? true : false}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#0046B5"
                      />
                    </td>
                    <td>
                      <QuantityInput
                        receiveQuantity={row.quantity ? row.quantity : 0}
                        infosReceived={row}
                        handleQuantity={(value: any) => handleOnQuantity(row, value)}
                        clearQuantity={() => {
                          setQuantityProducts('');
                          handleDeleteProducts(row.job_service_id);
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
                    Object.values(quantityProducts).includes(row.job_service_id) ? (
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
            </table>
          </Table>
        </div>
      </ModalDefault>
    </ProductsWrapper>
  );
}
