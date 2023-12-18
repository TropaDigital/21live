/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useRef, useState } from 'react';

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
  DateContainer,
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
import { DeliveryProps, IProductBackend } from '../../../../types';
import { BsTrash } from 'react-icons/bs';

// Libraries
import moment from 'moment';
import { useParamsHook } from '../../../../hooks/useParams';

interface FormProps {
  [key: string]: any;
}

interface TypeProps {
  task_type: number | string;
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
  handleTitleOfDelivery: (value: any, id: any) => void;
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
  errorDelivery: any;
  addDelivery: () => void;
  addProducts: (isOpen: boolean, title: string, indexDelivery: string) => void;
  updateTask: boolean;
}

interface OpenMenuProps {
  deliveryId: number | string;
  openInfo: boolean;
}

interface DeliveryUpdate {
  delivery_id: number | string;
  description: string;
  title: string;
  date_end: string;
  produtos: [];
  order: string;
}

interface DateDeliveryProps {
  isOpen: boolean;
  indexDelivery: number | any;
  dateType: string;
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
  errorDelivery,
  addDelivery,
  addProducts,
  passProductProps,
  updateDeliveryDate,
  handleTypeArt,
  handleTaskType,
  handleDescriptionProduct,
  handleFormatProduct,
  handleTitleOfDelivery,
  deliveriesArray,
  updateTask
}: Props) {
  const { parameters, getParams } = useParamsHook();
  const [descriptionText, setDescriptionText] = useState<any>({
    inputId: '',
    text: ''
  });
  const [formatType, setFormatType] = useState<any>('');
  const [createDeliveryTitle, setCreateDeliveryTitle] = useState<any>();
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
  const [dateDelivery, setDateDelivery] = useState<DateDeliveryProps>({
    isOpen: false,
    indexDelivery: '',
    dateType: ''
  });
  const { data: dataSingleProduct } = useFetch<IProductBackend[]>(
    `project-products-especific/${projectInfo?.project_product_id}`
  );
  const titleRef = useRef<any>();
  const creationDateRef = useRef<any>();
  const essayDateRef = useRef<any>();

  useEffect(() => {
    handleProducts('description', descriptionText.text, descriptionText.inputId);
  }, [descriptionText]);

  useEffect(() => {
    handleProducts('size', formatType, editFormat.productIndex);
  }, [formatType]);

  useEffect(() => {
    handleProducts('category', productType.productTypeValue, productType.productIndex);
  }, [productType]);

  useEffect(() => {
    handleProducts(
      'type',
      productDigitalPrinted.productTypeSelected,
      productDigitalPrinted.productIndex
    );
  }, [productDigitalPrinted]);

  useEffect(() => {
    if (!updateTask && dataSingleProduct) {
      const productToPass = {
        category: dataSingleProduct[0].category,
        description: dataSingleProduct[0].description,
        flag: dataSingleProduct[0].flag,
        minutes: dataSingleProduct[0].minutes,
        minutes_creation: dataSingleProduct[0].minutes_creation,
        minutes_essay: dataSingleProduct[0].minutes_essay,
        quantity: '1',
        service: dataSingleProduct[0].service,
        job_service_id: dataSingleProduct[0].job_service_id,
        size: dataSingleProduct[0].size,
        type: dataSingleProduct[0].type
      };
      passProductProps(productToPass);
    }
  }, [dataSingleProduct]);

  const handleDeliveryDate = (e: any, deliveryId: any) => {
    updateDeliveryDate(e, deliveryId);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setDateDelivery({
        isOpen: false,
        indexDelivery: '',
        dateType: ''
      });
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (createDeliveryTitle && titleRef.current && !titleRef.current.contains(e.target)) {
        setCreateDeliveryTitle('');
      }

      if (dateDelivery && creationDateRef.current && !creationDateRef.current.contains(e.target)) {
        setDateDelivery({
          isOpen: false,
          indexDelivery: '',
          dateType: ''
        });
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [createDeliveryTitle, dateDelivery]);

  useEffect(() => {
    getParams();
  }, []);

  return (
    <>
      {!deliveriesSplited && (
        <ProductsTable>
          <FormTitle>Produtos</FormTitle>
          <TotalHours>
            Total de horas estimadas: <span>{projectInfo?.tempo}</span>
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
                        disabled={descriptionText.inputId !== row.job_service_id}
                        onChange={(e: any) =>
                          setDescriptionText({
                            inputId: row.job_service_id,
                            text: e.target.value.slice(0, 40)
                          })
                        }
                        error={errorCategory?.description}
                      />
                      <EditableFormat
                        className={descriptionText.inputId === row.job_service_id ? 'edit' : ''}
                        onClick={() => {
                          setDescriptionText({ inputId: row.job_service_id, text: '' });
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
                          editFormat.productIndex === row.job_service_id && editFormat.editable
                            ? false
                            : true
                        }
                        onChange={(e: any) => setFormatType(e.target.value)}
                        error={errorCategory?.size}
                      />
                      <EditableFormat
                        className={editFormat.productIndex === row.job_service_id ? 'edit' : ''}
                        onClick={() => {
                          setEditFormat({
                            productIndex: row.job_service_id,
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
                          productIndex: row.job_service_id,
                          productTypeValue: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
                      error={errorCategory.includes(row.job_service_id) ? 'Campo vazio' : ''}
                    >
                      {dataTypes?.map((row: TypeProps) => (
                        <option key={row.task_type} value={row.task_type}>
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
                          productIndex: row.job_service_id,
                          productTypeSelected: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
                    >
                      <option value="impresso">Impressão</option>
                      <option value="digital">Digital</option>
                    </SelectDefault>
                  </td>
                  <td className="delete" onClick={() => deleteProduct(row.job_service_id, index)}>
                    <BsTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProductsTable>
      )}

      {deliveriesSplited && !updateTask && (
        <>
          {deliveriesArray?.map((row: DeliveryProps, index: any) => (
            <Deliveries
              openInfos={showDeliveryInfos?.deliveryId === row?.deliveryId ? true : false}
              key={index}
              onClick={() =>
                setShowDeliveryInfos({
                  deliveryId: row?.deliveryId,
                  openInfo: !showDeliveryInfos?.openInfo
                })
              }
            >
              <DeliveryTitle>
                <div className="title-flex">
                  <div
                    className="title-name"
                    onClick={() =>
                      setCreateDeliveryTitle(createDeliveryTitle ? '' : row.deliveryId)
                    }
                  >
                    {row.deliveryTitle ? row.deliveryTitle : `${index + 1}ª Entrega`}
                  </div>
                  {createDeliveryTitle === row.deliveryId && (
                    <div className="input-title" ref={titleRef}>
                      <InputDefault
                        label=""
                        placeholder="Digite o título..."
                        name="deliveryTitle"
                        type="text"
                        onChange={(e) =>
                          handleTitleOfDelivery(e.target.value.trimStart(), row.deliveryId)
                        }
                        value={row.deliveryTitle}
                        error={''}
                      />
                    </div>
                  )}
                  <span>-</span>
                  {row?.copywriting_date_end !== '' ? (
                    <DateContainer>
                      <div className="container-title">
                        Entrega{' '}
                        {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'}
                      </div>
                      <div
                        className="date"
                        onClick={() =>
                          setDateDelivery({
                            isOpen: true,
                            indexDelivery: row?.deliveryId,
                            dateType: 'essay'
                          })
                        }
                      >
                        <IconCalendar /> {moment(row.copywriting_date_end).format('DD/MM/YYYY')}
                      </div>
                    </DateContainer>
                  ) : (
                    <DateContainer>
                      <div
                        className={
                          errorDelivery[index]?.id === row.deliveryId &&
                          errorDelivery[index]?.typeError === 'copywriting'
                            ? 'date error'
                            : 'date add'
                        }
                        onClick={() =>
                          setDateDelivery({
                            isOpen: true,
                            indexDelivery: row.deliveryId,
                            dateType: 'essay'
                          })
                        }
                      >
                        <IconCalendar /> Adicionar data entrega{' '}
                        {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'}
                      </div>
                    </DateContainer>
                  )}
                  <span>-</span>
                  {row?.creation_date_end !== '' ? (
                    <DateContainer>
                      <div className="container-title">Entrega de atividade</div>
                      <div
                        className="date"
                        onClick={() =>
                          setDateDelivery({
                            isOpen: true,
                            indexDelivery: row.deliveryId,
                            dateType: 'creation'
                          })
                        }
                      >
                        <IconCalendar /> {moment(row.creation_date_end).format('DD/MM/YYYY')}
                      </div>
                    </DateContainer>
                  ) : (
                    <DateContainer>
                      <div
                        className={
                          errorDelivery[index]?.id === row.deliveryId &&
                          errorDelivery[index]?.typeError === 'creation'
                            ? 'date error'
                            : 'date add'
                        }
                        onClick={() =>
                          setDateDelivery({
                            isOpen: true,
                            indexDelivery: row.deliveryId,
                            dateType: 'creation'
                          })
                        }
                      >
                        <IconCalendar /> Adicionar data entrega da atividade
                      </div>
                    </DateContainer>
                  )}
                </div>
                {/* creation date */}
                {dateDelivery.indexDelivery === row.deliveryId &&
                  dateDelivery.isOpen === true &&
                  dateDelivery.dateType === 'creation' && (
                    <div style={{ marginRight: 'auto', marginLeft: '16px' }} ref={creationDateRef}>
                      <InputDefault
                        label=""
                        placeholder="00/00/0000"
                        name="creation_date_end"
                        type="date"
                        max={'9999-12-31'}
                        icon={BiCalendar}
                        onChange={(e) => handleDeliveryDate(e, row.deliveryId)}
                        value={row?.creation_date_end}
                        onKeyDown={handleKeyDown}
                        error={errorDelivery.id === row.deliveryId ? errorDelivery.error : ''}
                      />
                    </div>
                  )}

                {/* essay date */}
                {dateDelivery.indexDelivery === row.deliveryId &&
                  dateDelivery.isOpen === true &&
                  dateDelivery.dateType === 'essay' && (
                    <div style={{ marginRight: 'auto', marginLeft: '16px' }} ref={creationDateRef}>
                      <InputDefault
                        label=""
                        placeholder="00/00/0000"
                        name="copywriting_date_end"
                        type="date"
                        max={'9999-12-31'}
                        icon={BiCalendar}
                        onChange={(e) => handleDeliveryDate(e, row.deliveryId)}
                        value={row?.copywriting_date_end}
                        onKeyDown={handleKeyDown}
                        error={errorDelivery.id === row.deliveryId ? errorDelivery.error : ''}
                      />
                    </div>
                  )}
                <div
                  className="icon-arrow"
                  // onClick={() =>
                  //   setShowDeliveryInfos({
                  //     deliveryId: row?.deliveryId,
                  //     openInfo: !showDeliveryInfos?.openInfo
                  //   })
                  // }
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
                                disabled={descriptionText.inputId !== product.job_service_id}
                                onChange={(e: any) =>
                                  handleDescriptionProduct(
                                    index,
                                    indexProduct,
                                    product.job_service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  descriptionText.inputId === product.job_service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setDescriptionText({ inputId: product.job_service_id, text: '' });
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
                                  editFormat.productIndex === product.job_service_id &&
                                  editFormat.editable
                                    ? false
                                    : true
                                }
                                onChange={(e: any) =>
                                  handleFormatProduct(
                                    index,
                                    indexProduct,
                                    product.job_service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  editFormat.productIndex === product.job_service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setEditFormat({
                                    productIndex: product.job_service_id,
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
                                  product.job_service_id,
                                  e.target.value
                                )
                              }
                              placeHolder="Selecione..."
                              error={
                                errorCategory.includes(product.job_service_id) ? 'Campo vazio' : ''
                              }
                            >
                              {dataTypes?.map((row: TypeProps) => (
                                <option key={row.task_type} value={row.task_type}>
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
                                  product.job_service_id,
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
                            onClick={() => deleteProduct(product.job_service_id, row.deliveryId)}
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

      {deliveriesSplited && updateTask && (
        <>
          {deliveriesArray?.map((row: DeliveryUpdate, index: any) => (
            <Deliveries
              openInfos={showDeliveryInfos?.deliveryId === row?.delivery_id ? true : false}
              key={index}
            >
              <DeliveryTitle>
                <div className="title-flex">
                  <div
                    className="title-name"
                    onClick={() =>
                      setCreateDeliveryTitle(createDeliveryTitle ? '' : row.delivery_id)
                    }
                  >
                    {row.title ? row.title : `${index + 1}ª Entrega`}
                  </div>
                  {createDeliveryTitle === row.delivery_id && (
                    <div className="input-title" ref={titleRef}>
                      <InputDefault
                        label=""
                        placeholder="Digite o título..."
                        name="deliveryTitle"
                        type="text"
                        onChange={(e) => handleTitleOfDelivery(e.target.value, row.delivery_id)}
                        value={row.title}
                        error={''}
                      />
                    </div>
                  )}
                  <span>-</span>
                  <div
                    className="date"
                    onClick={() =>
                      setDateDelivery({
                        isOpen: true,
                        indexDelivery: row.delivery_id,
                        dateType: 'creation'
                      })
                    }
                  >
                    <IconCalendar /> {moment(row?.date_end).format('DD/MM/YYYY')}
                  </div>
                </div>
                {dateDelivery.indexDelivery === row.delivery_id && dateDelivery.isOpen === true && (
                  <div style={{ marginRight: 'auto', marginLeft: '16px' }} ref={creationDateRef}>
                    <InputDefault
                      label=""
                      placeholder=""
                      name="dateStart"
                      type="date"
                      max={'9999-12-31'}
                      icon={BiCalendar}
                      onChange={(e) => handleDeliveryDate(e.target.value, row.delivery_id)}
                      value={row?.date_end}
                    />
                  </div>
                )}
                <div
                  className="icon-arrow"
                  onClick={() =>
                    setShowDeliveryInfos({
                      deliveryId: row?.delivery_id,
                      openInfo: !showDeliveryInfos?.openInfo
                    })
                  }
                >
                  {showDeliveryInfos?.deliveryId === row?.delivery_id &&
                  showDeliveryInfos.openInfo === true ? (
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
                    <tbody>
                      {row.produtos?.map((product: any, indexProduct: any) => (
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
                                disabled={descriptionText.inputId !== product.job_service_id}
                                onChange={(e: any) =>
                                  handleDescriptionProduct(
                                    index,
                                    indexProduct,
                                    product.job_service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  descriptionText.inputId === product.job_service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setDescriptionText({ inputId: product.job_service_id, text: '' });
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
                                  editFormat.productIndex === product.job_service_id &&
                                  editFormat.editable
                                    ? false
                                    : true
                                }
                                onChange={(e: any) =>
                                  handleFormatProduct(
                                    index,
                                    indexProduct,
                                    product.job_service_id,
                                    e.target.value
                                  )
                                }
                                //   error={error?.date_start}
                              />
                              <EditableFormat
                                className={
                                  editFormat.productIndex === product.job_service_id ? 'edit' : ''
                                }
                                onClick={() => {
                                  setEditFormat({
                                    productIndex: product.job_service_id,
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
                                  product.products_delivery_id,
                                  e.target.value
                                )
                              }
                              placeHolder="Selecione..."
                              error={
                                errorCategory.includes(product.products_delivery_id)
                                  ? 'Campo vazio'
                                  : ''
                              }
                            >
                              {dataTypes?.map((row: TypeProps) => (
                                <option key={row.task_type} value={row.task_type}>
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
                                  product.job_service_id,
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
                            onClick={() => deleteProduct(product.job_service_id, row.delivery_id)}
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
                  <div className="trash" onClick={() => deleteDelivery(row.delivery_id)}>
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
