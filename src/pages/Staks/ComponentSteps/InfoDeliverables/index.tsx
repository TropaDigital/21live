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
  deliveriesSplited: boolean;
  deliveriesArray: any[];
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
  deliveriesSplited,
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
  deliveriesArray
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
  const [dateModal, setDateModal] = useState<ModalDeliveryProps>({
    isOpen: false,
    title: '',
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
                        setDateModal({
                          isOpen: true,
                          title: 'Adicionar data',
                          indexDelivery: index + 1
                        })
                      }
                    >
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
                                height: '82px'
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
                                errorCategory?.product_id === product.service_id
                                  ? 'Campo vazio'
                                  : ''
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
                </TableDelivery>
                <AddTextButton
                  title="Adicionar produto"
                  click={() => addProducts(true, 'Adicionar produto', index + 1)}
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
              onChange={(e) => updateDeliveryDate(e.target.value, dateModal.indexDelivery)}
              value={'00/00/0000'}
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
    </>
  );
}
