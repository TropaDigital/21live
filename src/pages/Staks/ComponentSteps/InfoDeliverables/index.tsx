/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiCalendar, BiPencil } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi';

// Components
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../../components/Inputs/SelectDefault';
import AddTextButton from '../../../../components/Buttons/AddTextButton';

// Styles
import { FormTitle } from '../../../Projects/CreateProject/styles';
import {
  AddNewDelivery,
  Deliveries,
  DeliveryTitle,
  EditableFormat,
  NewDelivery,
  ProductsTable,
  TableDelivery,
  TotalHours
} from './styles';

// Icons
import { IconCalendar, IconPlus } from '../../../../assets/icons';

// Hooks
import { useFetch } from '../../../../hooks/useFetch';

// Utils
import { IProductBackend } from '../../../../types';
import { BsTrash } from 'react-icons/bs';

// Libraries
import moment from 'moment';

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
  deliveriesSplited: boolean;
  deliveriesArray: any[];
  deleteProduct: (id: number, deliveryId: any) => void;
  deleteDelivery: (id: number | string) => void;
  projectInfo: any;
  passProductProps: (product: any) => void;
  updateDeliveryDate: (value: any, id: any) => void;
  handleTypeArt: (
    indexDeliverie: number,
    indexProduct: number,
    idProduct: number,
    value: any
  ) => void;
  handleTaskType: (
    indexDeliverie: number,
    indexProduct: number,
    idProduct: number,
    value: any
  ) => void;
  handleDescriptionProduct: (
    indexDeliverie: number,
    indexProduct: number,
    idProduct: number,
    value: any
  ) => void;
  handleFormatProduct: (
    indexDeliverie: number,
    indexProduct: number,
    idProduct: number,
    value: any
  ) => void;
  errorCategory: any;
  addDelivery: () => void;
  addProducts: (isOpen: boolean, title: string, indexDelivery: string) => void;
  updateTask: boolean;
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

interface ModalDateDeliveryProps {
  isOpen: boolean;
  indexDelivery: number | any;
}

export default function InfoDeliveries({
  data,
  dataTypes,
  handleProducts,
  deliveriesSplited,
  deleteDelivery,
  deleteProduct,
  projectInfo,
  errorCategory,
  addDelivery,
  addProducts,
  passProductProps,
  updateDeliveryDate,
  handleTypeArt,
  handleTaskType,
  handleDescriptionProduct,
  handleFormatProduct,
  deliveriesArray,
  updateTask
}: Props) {
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
  const [dateDelivery, setDateDelivery] = useState<ModalDateDeliveryProps>({
    isOpen: false,
    indexDelivery: ''
  });
  const { data: dataSingleProduct } = useFetch<IProductBackend[]>(
    `project-products-especific/${projectInfo.product_id}`
  );

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
    if (!updateTask && dataSingleProduct) {
      const productToPass = {
        category: dataSingleProduct[0].category,
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

  const handleDeliveryDate = (e: any, deliveryId: any) => {
    updateDeliveryDate(e, deliveryId);
    setDateDelivery({
      isOpen: false,
      indexDelivery: ''
    });
  };

  return (
    <>
      {!deliveriesSplited && (
        <ProductsTable>
          <FormTitle>Produtos</FormTitle>
          <TotalHours>
            Total de horas estimadas: <span>{projectInfo.tempo}</span>
          </TotalHours>
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
                        error={errorCategory?.description}
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
                        error={errorCategory?.size}
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
                      error={errorCategory.includes(row.service_id) ? 'Campo vazio' : ''}
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
                      // value={row.type === 'impresso' ? 'impressao' : 'digital'}
                      value={row.type}
                      onChange={(e: any) =>
                        setProductDigitalPrinted({
                          productIndex: row.service_id,
                          productTypeSelected: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
                    >
                      <option value="impresso">Impressão</option>
                      <option value="digital">Digital</option>
                    </SelectDefault>
                  </td>
                  <td className="delete" onClick={() => deleteProduct(row.service_id, index)}>
                    <BsTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductsTable>
      )}

      {deliveriesSplited && (
        <>
          {deliveriesArray?.map((row: DeliveryProps, index: any) => (
            <Deliveries
              openInfos={showDeliveryInfos?.deliveryId === row?.deliveryId ? true : false}
              key={index}
            >
              <DeliveryTitle>
                <div className="title-delivery">
                  {index + 1}ª Entrega
                  <span>-</span>
                  {row?.deliveryDate !== '' ? (
                    <div
                      className="date"
                      onClick={() =>
                        setDateDelivery({
                          isOpen: true,
                          indexDelivery: row?.deliveryId
                        })
                      }
                    >
                      <IconCalendar /> {moment(row?.deliveryDate).format('DD/MM/YYYY')}
                    </div>
                  ) : (
                    <div
                      className="date add"
                      onClick={() =>
                        setDateDelivery({
                          isOpen: true,
                          indexDelivery: row?.deliveryId
                        })
                      }
                    >
                      <IconCalendar /> Adicionar vencimento
                    </div>
                  )}
                </div>
                {dateDelivery.indexDelivery === row.deliveryId && dateDelivery.isOpen === true && (
                  <div style={{ marginRight: 'auto', marginLeft: '16px' }}>
                    <InputDefault
                      label=""
                      placeholder=""
                      name="dateStart"
                      type="date"
                      icon={BiCalendar}
                      onChange={(e) => handleDeliveryDate(e.target.value, row.deliveryId)}
                      value={row?.deliveryDate}
                    />
                  </div>
                )}
                <div
                  className="icon-arrow"
                  onClick={() =>
                    setShowDeliveryInfos({
                      deliveryId: row?.deliveryId,
                      openInfo: !showDeliveryInfos?.openInfo
                    })
                  }
                >
                  {showDeliveryInfos?.deliveryId === row?.deliveryId &&
                  showDeliveryInfos.openInfo === true ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {/* <div className="delete-delivery">X</div> */}
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
                    <tbody>
                      {row.deliveryProducts?.map((product: any, indexProduct: any) => (
                        <tr key={indexProduct}>
                          <td>#{indexProduct + 1}</td>
                          <td style={{ minWidth: '150px' }}>{product.service}</td>
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
                                value={product.description}
                                maxLength={40}
                                type={'text'}
                                disabled={descriptionText.inputId !== product.service_id}
                                onChange={(e: any) =>
                                  handleDescriptionProduct(
                                    index,
                                    indexProduct,
                                    product.service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  descriptionText.inputId === product.service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setDescriptionText({ inputId: product.service_id, text: '' });
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
                                height: '72px'
                              }}
                            >
                              <InputDefault
                                label=""
                                name="format"
                                placeholder="128x190"
                                value={product.size}
                                disabled={
                                  editFormat.productIndex === product.service_id &&
                                  editFormat.editable
                                    ? false
                                    : true
                                }
                                onChange={(e: any) =>
                                  handleFormatProduct(
                                    index,
                                    indexProduct,
                                    product.service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  editFormat.productIndex === product.service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setEditFormat({
                                    productIndex: product.service_id,
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
                              value={product.reason_change}
                              onChange={(e: any) =>
                                handleTaskType(
                                  index,
                                  indexProduct,
                                  product.service_id,
                                  e.target.value
                                )
                              }
                              placeHolder="Selecione..."
                              error={
                                errorCategory.includes(product.service_id) ? 'Campo vazio' : ''
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
                              // value={product.type === 'impresso' ? 'impressao' : 'digital'}
                              value={product.type}
                              onChange={(e: any) =>
                                handleTypeArt(
                                  index,
                                  indexProduct,
                                  product.service_id,
                                  e.target.value
                                )
                              }
                              placeHolder="Selecione..."
                            >
                              <option value="impresso">Impressão</option>
                              <option value="digital">Digital</option>
                            </SelectDefault>
                          </td>
                          <td
                            className="delete"
                            onClick={() => deleteProduct(product.service_id, row.deliveryId)}
                          >
                            <BsTrash />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableDelivery>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px'
                  }}
                >
                  <AddTextButton
                    title="Adicionar produto"
                    click={() => addProducts(true, 'Adicionar produto', index + 1)}
                    marginTop="0"
                  />
                  <div className="trash" onClick={() => deleteDelivery(row.deliveryId)}>
                    <BsTrash />
                    Excluir entrega
                  </div>
                </div>
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
    </>
  );
}
