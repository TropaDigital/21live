/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiCalendar, BiPencil, BiSearchAlt } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi';

// Components
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../../components/Inputs/SelectDefault';
import AddTextButton from '../../../../components/Buttons/AddTextButton';
import ModalDefault from '../../../../components/Ui/ModalDefault';
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

// Styles
import { FormTitle } from '../../../CreateProject/styles';
import {
  AddNewDelivery,
  DateInput,
  DateModal,
  DateModalTitle,
  Deliveries,
  DeliveryTitle,
  EditableFormat,
  NewDelivery,
  ProductsTable,
  TableDelivery
} from './styles';

// Icons
import { IconCalendar, IconClose, IconPlus } from '../../../../assets/icons';

// Libraries
import moment from 'moment';
import {
  AddProductButton,
  CloseModalButton,
  EstimatedHoursOfProducst,
  Product,
  ProductListHeader,
  ProductListWrapper,
  ProductModalTitle,
  ProductsModalTop,
  ProductsModalWrapper,
  SearchProductsModal
} from '../../CreateTasks/styles';
import QuantityInput from '../../../../components/Inputs/QuantityInput';
import useDebouncedCallback from '../../../../hooks/useDebounced';
import { CheckboxDefault } from '../../../../components/Inputs/CheckboxDefault';

// Hooks
import { useFetch } from '../../../../hooks/useFetch';
import { useToast } from '../../../../hooks/toast';

// Utils
import { multiplyTime } from '../../../../utils/convertTimes';
import { IProduct, IProductBackend } from '../../../../types';

interface FormProps {
  [key: string]: any;
}

interface TypeProps {
  type_id: number | string;
  name: string;
  percent: number | string;
}

interface Props {
  data: any;
  dataTypes: any;
  handleProducts: (field: string, value: any, product: any) => void;
  error: FormProps;
  deliveriesSplited: boolean;
  totalProjectTime: any;
  deliveryType: string;
  projectInfo: any;
  passProductProps: (product: any) => void;
  errorCategory: any;
  addDeliveries: boolean;
  passDeliveries: any;
}

interface OpenMenuProps {
  deliveryId: number | string;
  openInfo: boolean;
}

interface DeliveryProps {
  deliveryId: number | string;
  deliveryDescription: string;
  deliveryDate: string;
  deliveryProducts: [];
  showInfo: boolean;
}

interface ModalDeliveryProps {
  isOpen: boolean;
  title: string;
  indexDelivery: number | any;
}

export default function InfoDeliveries({
  data,
  dataTypes,
  handleProducts,
  error,
  deliveriesSplited,
  deliveryType,
  totalProjectTime,
  projectInfo,
  errorCategory,
  addDeliveries,
  passDeliveries,
  passProductProps
}: Props) {
  const { addToast } = useToast();
  const [descriptionText, setDescriptionText] = useState<any>({
    inputId: '',
    text: ''
  });
  const [formatType, setFormatType] = useState<any>('');
  const [editFormat, setEditFormat] = useState<any>({
    productIndex: '',
    editable: true
  });
  const [showDeliveryInfos, setShowDeliveryInfos] = useState<OpenMenuProps>({
    deliveryId: 1,
    openInfo: true
  });
  const [productType, setProductType] = useState<any>({
    productIndex: '',
    productTypeValue: ''
  });
  const [productDigitalPrinted, setProductDigitalPrinted] = useState<any>({
    productIndex: '',
    productTypeSelected: ''
  });
  const [dateModal, setDateModal] = useState<ModalDeliveryProps>({
    isOpen: false,
    title: '',
    indexDelivery: ''
  });
  const [productsModal, setProductsModal] = useState<ModalDeliveryProps>({
    isOpen: false,
    title: '',
    indexDelivery: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (searchTerm: string) => setSearchTerm(searchTerm),
    700
  );
  const { data: dataProducts, fetchData: fetchProducts } = useFetch<any[]>(
    `services?search=${searchTerm}&flag=false`
  );
  const { data: dataSingleProduct } = useFetch<IProductBackend[]>(
    `project-products-especific/${projectInfo.product_id}`
  );

  const DeliveryDefault: DeliveryProps = {
    deliveryId: 1,
    deliveryDescription: '',
    deliveryDate: '',
    deliveryProducts: data,
    showInfo: false
  };
  const [DTODelivery, setDTODelivery] = useState<any[]>([DeliveryDefault]);

  const productsHoursArray = DTODelivery.map((row: DeliveryProps) => {
    row?.deliveryProducts?.map((obj: any) => {
      // console.log('log do map dos products', obj);
      return multiplyTime(obj?.minutes, obj?.quantity);
    });
  });

  const totalProductsHours = productsHoursArray;

  // console.log('log do totalProductHours', totalProductsHours);

  useEffect(() => {
    if (dataSingleProduct) {
      const productToPass = {
        description: dataSingleProduct[0].description,
        flag: dataSingleProduct[0].flag,
        minutes: dataSingleProduct[0].minutes,
        quantity: '1',
        service: dataSingleProduct[0].service,
        service_id: dataSingleProduct[0].service_id,
        size: dataSingleProduct[0].size,
        type: dataSingleProduct[0].type
      };
      passProductProps(productToPass);
    }
  }, [dataSingleProduct]);

  const addDelivery = () => {
    const newDelivery: DeliveryProps = {
      deliveryId: DTODelivery.length + 1,
      deliveryDescription: '',
      deliveryDate: '',
      deliveryProducts: [],
      showInfo: false
    };
    DTODelivery.push(newDelivery);
    setDTODelivery([...DTODelivery]);
  };

  const handleUpdateDeliveryDate = (value: any, id: any) => {
    const newDate = moment(value).format('DD/MM/YYYY');
    setDTODelivery((current: any) =>
      current.map((obj: { deliveryId: any }) => {
        if (obj.deliveryId === id) {
          return { ...obj, deliveryDate: newDate };
        }
        return obj;
      })
    );
  };

  const handleOnChangeCheckbox = (product: any, idDelivery: any) => {
    console.log('log do product and ID', product, idDelivery, DTODelivery);
    const newProduct = {
      category: product.category,
      description: product.description,
      flag: product.flag,
      minutes: product.minutes,
      service: product.service,
      service_id: product.service_id,
      size: product.size,
      type: product.type,
      quantity: 1
    };
    if (
      DTODelivery[idDelivery - 1]?.deliveryProducts.filter(
        (obj: any) => obj.service_id === product.service_id
      ).length > 0
    ) {
      const newArray = DTODelivery[idDelivery]?.deliveryProducts.filter(
        (obj: any) => obj.service_id !== product.service_id
      );
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return { ...obj, deliveryProducts: [] };
          }
          return obj;
        })
      );
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return { ...obj, deliveryProducts: newArray };
          }
          return obj;
        })
      );
      console.log('log filter product', product, newArray);
    } else if (totalProjectTime && totalProjectTime < product.minutes) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (totalProjectTime < totalProductsHours) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else {
      console.log('log do product with the id finded', newProduct);
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return {
              ...obj,
              deliveryProducts: [...obj.deliveryProducts, newProduct]
            };
          }
          return obj;
        })
      );
    }
  };

  const handleCheckQuantity = (quantity: any, product: IProduct) => {
    console.log('log do product check quantity', quantity, product);
    const totalProductTime = multiplyTime(product.minutes, quantity);

    if (totalProjectTime && totalProductTime > totalProjectTime) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os produtos e quantidades!'
      });
    } else {
      handleProductQuantity(quantity, product);
    }
  };

  const handleProductQuantity = (value: any, product: any) => {
    console.log('log do product para alterar quantidade', value, product);
    if (
      DTODelivery[productsModal.indexDelivery]?.deliveryProducts.filter(
        (obj: any) => obj.service_id === product.service_id
      ).length > 0
    ) {
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryProducts.service_id === product.service_id) {
            return {
              ...obj,
              quantity: value
            };
          }
          return obj;
        })
      );
    }
  };

  const handleDigitalPrinted = (id: any, value: any) => {
    console.log('log do que vou editar o tipo', id, value);
    setDTODelivery((current: any) =>
      current.map((obj: any) => {
        obj.map((product: IProduct) => {
          if (product.service_id === id) {
            return { ...obj, type: value };
          }
          return obj;
        });
      })
    );
  };

  const handleType = (indexId: any, id: any, value: any) => {
    const currentProducts = DTODelivery[indexId].deliveryProducts;

    const productToUpdate = currentProducts[id];

    const updatedProduct = {
      ...productToUpdate,
      reason_change: value
    };

    currentProducts[id] = updatedProduct;

    setDTODelivery((current: any) =>
      current.map((obj: DeliveryProps) => {
        if (obj.deliveryProducts[id] === id) {
          return { deliveryProducts: currentProducts };
        }
        return obj;
      })
    );
  };

  useEffect(() => {
    handleProducts('description', descriptionText.text, descriptionText.inputId);
  }, [descriptionText]);

  useEffect(() => {
    handleProducts('size', formatType, editFormat.productIndex);
  }, [formatType]);

  useEffect(() => {
    handleProducts('category', productType.productTypeValue, productType.productIndex);
  }, [productType.productTypeValue]);

  useEffect(() => {
    handleProducts(
      'type',
      productDigitalPrinted.productTypeSelected,
      productDigitalPrinted.productIndex
    );
  }, [productDigitalPrinted.productTypeSelected]);

  useEffect(() => {
    // console.log('log do modal', dateModal);
    console.log('log do modal', productsModal);
    console.log('log do DTODelivery', DTODelivery);
  }, [productsModal, DTODelivery]);

  useEffect(() => {
    console.log('log pra enviar as entregas', addDeliveries);
    if (deliveriesSplited) {
      passDeliveries(DTODelivery);
    }
  }, [addDeliveries, DTODelivery]);

  useEffect(() => {
    console.log('log delivery splited', deliveriesSplited);
  }, [deliveriesSplited]);

  return (
    <>
      {!deliveriesSplited && (
        <ProductsTable>
          <FormTitle>Produtos</FormTitle>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Formato</th>
                <th>Tipo</th>
                <th>I/D</th>
                <th style={{ display: 'grid', placeItems: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row: any, index: any) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td style={{ minWidth: '150px' }}>{row.service}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '100%'
                      }}
                    >
                      <InputDefault
                        label=""
                        name="description"
                        placeholder="Lorem ipsum dolor sit malesuada"
                        value={row.description}
                        maxLength={40}
                        type={'text'}
                        disabled={descriptionText.inputId !== row.service_id}
                        onChange={(e: any) =>
                          setDescriptionText({
                            inputId: row.service_id,
                            text: e.target.value.slice(0, 40)
                          })
                        }
                        //   error={error?.date_start}
                      />
                      <EditableFormat
                        className={descriptionText.inputId === row.service_id ? 'edit' : ''}
                        onClick={() => {
                          setDescriptionText({ inputId: row.service_id, text: '' });
                        }}
                      >
                        <BiPencil />
                      </EditableFormat>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        height: '82px'
                      }}
                    >
                      <InputDefault
                        label=""
                        name="format"
                        placeholder="128x190"
                        value={row.size}
                        disabled={
                          editFormat.productIndex === row.service_id && editFormat.editable
                            ? false
                            : true
                        }
                        onChange={(e: any) => setFormatType(e.target.value)}
                        //   error={error?.date_start}
                      />
                      <EditableFormat
                        className={editFormat.productIndex === row.service_id ? 'edit' : ''}
                        onClick={() => {
                          setEditFormat({
                            productIndex: row.service_id,
                            editable: true
                          });
                          setFormatType('');
                        }}
                      >
                        <BiPencil />
                      </EditableFormat>
                    </div>
                  </td>
                  <td style={{ minWidth: '220px' }}>
                    <SelectDefault
                      label=""
                      name="type"
                      value={row.reason_change}
                      onChange={(e: any) =>
                        setProductType({
                          productIndex: row.service_id,
                          productTypeValue: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
                      error={errorCategory.product_id === row.service_id ? 'Campo vazio' : ''}
                    >
                      {dataTypes?.map((row: TypeProps) => (
                        <option key={row.type_id} value={row.type_id}>
                          {row.name}
                        </option>
                      ))}
                    </SelectDefault>
                  </td>
                  <td style={{ minWidth: '220px' }}>
                    <SelectDefault
                      label=""
                      name="I/D"
                      value={row.type === 'impresso' ? 'impressao' : 'digital'}
                      onChange={(e: any) =>
                        setProductDigitalPrinted({
                          productIndex: row.service_id,
                          productTypeSelected: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
                    >
                      <option value="impressao">Impressão</option>
                      <option value="digital">Digital</option>
                    </SelectDefault>
                  </td>
                  <td style={{ cursor: 'pointer' }}>
                    <FiMenu />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductsTable>
      )}

      {deliveriesSplited && (
        <>
          {DTODelivery?.map((row: DeliveryProps, index: any) => (
            <Deliveries
              openInfos={showDeliveryInfos?.deliveryId === row?.deliveryId ? true : false}
              key={index}
            >
              <DeliveryTitle>
                <div className="title-delivery">
                  {index + 1}ª Entrega
                  <span>-</span>
                  {row?.deliveryDate !== '' ? (
                    <div className="date">
                      <IconCalendar /> {row?.deliveryDate}
                    </div>
                  ) : (
                    <div
                      className="date add"
                      onClick={() =>
                        setDateModal({
                          isOpen: true,
                          title: 'Adicionar data',
                          indexDelivery: index + 1
                        })
                      }
                    >
                      <IconCalendar /> Adicionar vencimento
                    </div>
                  )}
                </div>
                <div
                  className="icon-arrow"
                  onClick={() =>
                    setShowDeliveryInfos({
                      deliveryId: row?.deliveryId,
                      openInfo: showDeliveryInfos?.openInfo ? false : true
                    })
                  }
                >
                  {showDeliveryInfos?.deliveryId === row?.deliveryId ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>
              </DeliveryTitle>
              <div style={{ padding: '24px' }}>
                <TableDelivery>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Formato</th>
                        <th>Tipo</th>
                        <th>I/D</th>
                        <th style={{ display: 'grid', placeItems: 'center', height: '45px' }}></th>
                      </tr>
                    </thead>
                    {index === 0 && data && (
                      <tbody>
                        {data?.map((row: any, index: any) => (
                          <tr key={index}>
                            <td>#{index + 1}</td>
                            <td style={{ minWidth: '150px' }}>{row.service}</td>
                            <td>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  minWidth: '100%'
                                }}
                              >
                                <InputDefault
                                  label=""
                                  name="description"
                                  placeholder="Lorem ipsum dolor sit malesuada"
                                  value={row.description}
                                  maxLength={40}
                                  type={'text'}
                                  disabled={descriptionText.inputId !== row.service_id}
                                  onChange={(e: any) =>
                                    setDescriptionText({
                                      inputId: row.service_id,
                                      text: e.target.value.slice(0, 40)
                                    })
                                  }
                                  //   error={error?.date_start}
                                />
                                <EditableFormat
                                  className={
                                    descriptionText.inputId === row.service_id ? 'edit' : ''
                                  }
                                  onClick={() => {
                                    setDescriptionText({ inputId: row.service_id, text: '' });
                                  }}
                                >
                                  <BiPencil />
                                </EditableFormat>
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '18px',
                                  height: '82px'
                                }}
                              >
                                <InputDefault
                                  label=""
                                  name="format"
                                  placeholder="128x190"
                                  value={row.size}
                                  disabled={
                                    editFormat.productIndex === row.service_id &&
                                    editFormat.editable
                                      ? false
                                      : true
                                  }
                                  onChange={(e: any) => setFormatType(e.target.value)}
                                  //   error={error?.date_start}
                                />
                                <EditableFormat
                                  className={
                                    editFormat.productIndex === row.service_id ? 'edit' : ''
                                  }
                                  onClick={() => {
                                    setEditFormat({
                                      productIndex: row.service_id,
                                      editable: true
                                    });
                                    setFormatType('');
                                  }}
                                >
                                  <BiPencil />
                                </EditableFormat>
                              </div>
                            </td>
                            <td style={{ minWidth: '220px' }}>
                              <SelectDefault
                                label=""
                                name="type"
                                value={row.reason_change}
                                onChange={(e: any) => handleType(0, 0, e.target.value)}
                                placeHolder="Selecione..."
                                error={
                                  errorCategory?.product_id === row.service_id ? 'Campo vazio' : ''
                                }
                              >
                                {dataTypes?.map((row: TypeProps) => (
                                  <option key={row.type_id} value={row.type_id}>
                                    {row.name}
                                  </option>
                                ))}
                              </SelectDefault>
                            </td>
                            <td style={{ minWidth: '220px' }}>
                              <SelectDefault
                                label=""
                                name="I/D"
                                value={row.type}
                                onChange={(e: any) =>
                                  setProductDigitalPrinted({
                                    productIndex: row.service_id,
                                    productTypeSelected: e.target.value
                                  })
                                }
                                placeHolder="Selecione..."
                              >
                                <option value="impressao">Impressão</option>
                                <option value="digital">Digital</option>
                              </SelectDefault>
                            </td>
                            <td style={{ cursor: 'pointer' }}>
                              <FiMenu />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {index > 0 && DTODelivery.length > 1 && (
                      <tbody>
                        {DTODelivery[index]?.deliveryProducts?.map(
                          (row: any, indexDelivery: any) => (
                            <tr key={indexDelivery}>
                              <td>#{indexDelivery + 1}</td>
                              <td style={{ minWidth: '150px' }}>{row.service}</td>
                              <td>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    minWidth: '100%'
                                  }}
                                >
                                  <InputDefault
                                    label=""
                                    name="description"
                                    placeholder="Lorem ipsum dolor sit malesuada"
                                    value={row.description}
                                    maxLength={40}
                                    type={'text'}
                                    disabled={descriptionText.inputId !== row.service_id}
                                    onChange={(e: any) =>
                                      setDescriptionText({
                                        inputId: row.service_id,
                                        text: e.target.value.slice(0, 40)
                                      })
                                    }
                                    //   error={error?.date_start}
                                  />
                                  <EditableFormat
                                    className={
                                      descriptionText.inputId === row.service_id ? 'edit' : ''
                                    }
                                    onClick={() => {
                                      setDescriptionText({ inputId: row.service_id, text: '' });
                                    }}
                                  >
                                    <BiPencil />
                                  </EditableFormat>
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '18px',
                                    height: '82px'
                                  }}
                                >
                                  <InputDefault
                                    label=""
                                    name="format"
                                    placeholder="128x190"
                                    value={row.size}
                                    disabled={
                                      editFormat.productIndex === row.service_id &&
                                      editFormat.editable
                                        ? false
                                        : true
                                    }
                                    onChange={(e: any) => setFormatType(e.target.value)}
                                    //   error={error?.date_start}
                                  />
                                  <EditableFormat
                                    className={
                                      editFormat.productIndex === row.service_id ? 'edit' : ''
                                    }
                                    onClick={() => {
                                      setEditFormat({
                                        productIndex: row.service_id,
                                        editable: true
                                      });
                                      setFormatType('');
                                    }}
                                  >
                                    <BiPencil />
                                  </EditableFormat>
                                </div>
                              </td>
                              <td style={{ minWidth: '220px' }}>
                                <SelectDefault
                                  label=""
                                  name="type"
                                  value={row.reason_change}
                                  onChange={(e: any) =>
                                    handleType(index, indexDelivery, e.target.value)
                                  }
                                  placeHolder="Selecione..."
                                  error={
                                    errorCategory.product_id === row.service_id ? 'Campo vazio' : ''
                                  }
                                >
                                  {dataTypes?.map((row: TypeProps) => (
                                    <option key={row.type_id} value={row.type_id}>
                                      {row.name}
                                    </option>
                                  ))}
                                </SelectDefault>
                              </td>
                              <td style={{ minWidth: '220px' }}>
                                <SelectDefault
                                  label=""
                                  name="I/D"
                                  value={row.type}
                                  onChange={(e: any) =>
                                    handleDigitalPrinted(row.service_id, e.target.value)
                                  }
                                  placeHolder="Selecione..."
                                >
                                  <option value="impressao">Impressão</option>
                                  <option value="digital">Digital</option>
                                </SelectDefault>
                              </td>
                              <td style={{ cursor: 'pointer' }}>
                                <FiMenu />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    )}
                  </table>
                </TableDelivery>
                <AddTextButton
                  title="Adicionar produto"
                  click={() =>
                    setProductsModal({
                      isOpen: true,
                      title: 'Adicionar produto',
                      indexDelivery: index + 1
                    })
                  }
                />
              </div>
            </Deliveries>
          ))}

          <NewDelivery onClick={addDelivery}>
            <AddNewDelivery>
              <div className="plus">
                <IconPlus />
              </div>
              Adicionar nova entrega
            </AddNewDelivery>
          </NewDelivery>
        </>
      )}

      {/* Modal de adicionar data */}
      <ModalDefault
        isOpen={dateModal.isOpen}
        onOpenChange={() =>
          setDateModal({
            isOpen: false,
            title: '',
            indexDelivery: ''
          })
        }
        maxWidth="400px"
      >
        <DateModal>
          <DateModalTitle>Adicionar data</DateModalTitle>
          <DateInput>
            <InputDefault
              label="Data da entrega"
              placeholder="00/00/0000"
              name="dateStart"
              type="date"
              icon={BiCalendar}
              onChange={(e) => handleUpdateDeliveryDate(e.target.value, dateModal.indexDelivery)}
              value={DTODelivery[dateModal.indexDelivery]?.deliveryDate}
            />
          </DateInput>
          <ButtonDefault
            onClick={() =>
              setDateModal({
                isOpen: false,
                title: '',
                indexDelivery: ''
              })
            }
          >
            Confirmar
          </ButtonDefault>
        </DateModal>
      </ModalDefault>

      {/* Modal product list */}
      <ModalDefault
        isOpen={productsModal.isOpen}
        onOpenChange={() =>
          setProductsModal({
            isOpen: false,
            title: '',
            indexDelivery: ''
          })
        }
        maxWidth="848px"
      >
        <ProductsModalWrapper>
          <ProductsModalTop>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <ProductModalTitle>Lista de produtos</ProductModalTitle>
              <EstimatedHoursOfProducst>
                <div className="info-title">Horas disponíveis no contrato:</div>
                <div className="info-hours">{totalProjectTime}</div>
              </EstimatedHoursOfProducst>
            </div>
            <CloseModalButton
              onClick={() =>
                setProductsModal({
                  isOpen: false,
                  title: '',
                  indexDelivery: ''
                })
              }
            >
              <IconClose />
            </CloseModalButton>
          </ProductsModalTop>

          <ProductListWrapper>
            <SearchProductsModal>
              <InputDefault
                label=""
                name="search"
                placeholder="Buscar produtos"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  debouncedCallback(event.target.value);
                }}
                value={searchTerm}
                icon={BiSearchAlt}
                isLoading={isLoading}
                className="search-field"
              />
            </SearchProductsModal>
            <ProductListHeader>
              <div className="list-title">Produto</div>
              <div className="list-title">Categoria</div>
              <div className="list-title">Horas estimadas</div>
              <div className="list-title center">Quantidade</div>
            </ProductListHeader>

            {dataProducts?.map((row: any, index) => (
              <Product key={index}>
                <div className="product">
                  <CheckboxDefault
                    label=""
                    name={row.service_id}
                    onChange={() => handleOnChangeCheckbox(row, productsModal.indexDelivery)}
                    checked={
                      DTODelivery[productsModal.indexDelivery - 1]?.deliveryProducts?.filter(
                        (obj: any) => obj.service_id === row.service_id
                      ).length > 0
                        ? true
                        : false
                    }
                  />
                  {row.service}
                </div>
                <div className="category">{row.category}</div>
                <div className="category">{row.minutes}</div>
                <div className="quantity">
                  <QuantityInput
                    receiveQuantity={
                      DTODelivery[productsModal.indexDelivery - 1]?.deliveryProducts?.filter(
                        (obj: any) => obj.service_id === row.service_id
                      ).length > 0
                        ? 1
                        : 0
                    }
                    infosReceived={row}
                    handleQuantity={(value: any) => handleCheckQuantity(value, row)}
                    disabledInput={false}
                  />
                </div>
              </Product>
            ))}
          </ProductListWrapper>

          <AddProductButton>
            <ButtonDefault
              typeButton="primary"
              onClick={() => {
                console.log('add product');
                setProductsModal({
                  isOpen: false,
                  title: '',
                  indexDelivery: ''
                });
              }}
            >
              Adicionar Produto
            </ButtonDefault>
          </AddProductButton>
        </ProductsModalWrapper>
      </ModalDefault>
    </>
  );
}
