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
import { IconCalendar, IconPlus } from '../../../../assets/icons';
import AddTextButton from '../../../../components/Buttons/AddTextButton';
import ModalDefault from '../../../../components/Ui/ModalDefault';
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

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
  addProducts: () => void;
}

interface OpenMenuProps {
  deliveryId: number | string;
  openInfo: boolean;
}

interface DeliveryProps {
  deliveryId: number | string;
  deliveryTitle: string;
  deliveryDate: string;
  showInfo: boolean;
}

export default function InfoDeliveries({
  data,
  dataTypes,
  handleProducts,
  error,
  deliveriesSplited,
  addProducts
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
    openInfo: false
  });
  const [productType, setProductType] = useState<any>({
    productIndex: '',
    productTypeValue: ''
  });
  const [productImpDig, setProductImpDig] = useState<any>({
    productIndex: '',
    productTypeSelected: ''
  });
  const [dateModal, setDateModal] = useState<boolean>(false);

  const DeliveryDefault: DeliveryProps = {
    deliveryId: 1,
    deliveryTitle: '',
    deliveryDate: '13/03/2023',
    showInfo: false
  };

  const [DTODelivery, setDTODelivery] = useState<any>([DeliveryDefault]);

  const addDelivery = () => {
    const newDelivery: DeliveryProps = {
      deliveryId: DTODelivery.length + 1,
      deliveryTitle: '',
      deliveryDate: '',
      showInfo: false
    };
    DTODelivery.push(newDelivery);
    setDTODelivery([...DTODelivery]);
  };

  const handleUpdateDeliveryDate = (value: any) => {
    const [year, month, day] = value.split('-');
    setDTODelivery((current: { deliveryId: any }[]) =>
      current.map((obj: { deliveryId: any }) => {
        if (obj.deliveryId === 2) {
          return { ...obj, deliveryDate: `${day}/${month}/${year}` };
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
    handleProducts('type', productImpDig.productTypeSelected, productImpDig.productIndex);
  }, [productImpDig.productTypeSelected]);

  useEffect(() => {
    console.log('log do DTO', DTODelivery);
  }, [DTODelivery]);

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
                      value={row.category}
                      onChange={(e: any) =>
                        setProductType({
                          productIndex: row.service_id,
                          productTypeValue: e.target.value
                        })
                      }
                      placeHolder="Selecione..."
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
                        setProductImpDig({
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
          {DTODelivery.map((row: DeliveryProps, index: any) => (
            <Deliveries
              openInfos={
                showDeliveryInfos.openInfo && showDeliveryInfos.deliveryId === row.deliveryId
                  ? true
                  : false
              }
              key={index}
            >
              <DeliveryTitle>
                <div className="title-delivery">
                  {index + 1}ª Entrega
                  <span>-</span>
                  {row.deliveryDate !== '' ? (
                    <div className="date">
                      <IconCalendar /> {row.deliveryDate}
                    </div>
                  ) : (
                    <div className="date add" onClick={() => setDateModal(true)}>
                      <IconCalendar /> Adicionar vencimento
                    </div>
                  )}
                </div>
                <div
                  className="icon-arrow"
                  onClick={() =>
                    setShowDeliveryInfos({
                      deliveryId: row.deliveryId,
                      openInfo: showDeliveryInfos.openInfo ? false : true
                    })
                  }
                >
                  {showDeliveryInfos.deliveryId === row.deliveryId && showDeliveryInfos.openInfo ? (
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
                              value={row.category}
                              onChange={(e: any) =>
                                setProductType({
                                  productIndex: row.service_id,
                                  productTypeValue: e.target.value
                                })
                              }
                              placeHolder="Selecione..."
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
                                setProductImpDig({
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
                </TableDelivery>
                <AddTextButton title="Adicionar produto" click={addProducts} />
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

      <ModalDefault isOpen={dateModal} onOpenChange={() => setDateModal(false)} maxWidth="400px">
        <DateModal>
          <DateModalTitle>Adicionar data</DateModalTitle>
          <DateInput>
            <InputDefault
              label=""
              placeholder="00/00/0000"
              name="dateStart"
              type="date"
              icon={BiCalendar}
              onChange={(e) => handleUpdateDeliveryDate(e.target.value)}
              value={DTODelivery[1]?.deliveryDate}
            />
          </DateInput>
          <ButtonDefault onClick={() => setDateModal(false)}>Confirmar</ButtonDefault>
        </DateModal>
      </ModalDefault>
    </>
  );
}
