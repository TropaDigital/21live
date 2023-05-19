/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Icons
import { BiPencil } from 'react-icons/bi';
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi';

// Components
import { InputDefault } from '../../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../../components/Inputs/SelectDefault';

// Styles
import { FormTitle } from '../../../CreateProject/styles';
import {
  AddNewDelivery,
  Deliveries,
  DeliveryTitle,
  EditableFormat,
  NewDelivery,
  ProductsTable,
  TableDelivery
} from './styles';
import { IconCalendar, IconPlus } from '../../../../assets/icons';
import AddTextButton from '../../../../components/Buttons/AddTextButton';

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
  handleProducts: () => void;
  error: FormProps;
  deliveriesSplited: boolean;
  addProducts: () => void;
}

interface OpenMenuProps {
  deliveryId: number | string;
  openInfo: boolean;
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
    deliveryId: '',
    openInfo: false
  });

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
              {[0, 1, 2].map((row: any, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td style={{ minWidth: '150px' }}>Produto {index + 1} com texto gigante </td>
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
                        value={descriptionText.inputId === index ? descriptionText.text : ''}
                        maxLength={40}
                        type={'text'}
                        disabled={descriptionText.inputId !== index}
                        onChange={(e: any) =>
                          setDescriptionText({ inputId: index, text: e.target.value.slice(0, 40) })
                        }
                        //   error={error?.date_start}
                      />
                      <EditableFormat
                        className={descriptionText.inputId === index ? 'edit' : ''}
                        onClick={() => {
                          setDescriptionText({ inputId: index, text: '' });
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
                        value={editFormat.productIndex === index ? formatType : ''}
                        disabled={
                          editFormat.productIndex === index && editFormat.editable ? false : true
                        }
                        onChange={(e: any) => setFormatType(e.target.value)}
                        //   error={error?.date_start}
                      />
                      <EditableFormat
                        className={editFormat.productIndex === index ? 'edit' : ''}
                        onClick={() => {
                          setEditFormat({
                            productIndex: index,
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
                      value={''}
                      onChange={(e: any) => console.log('log do select type', e)}
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
                      value={''}
                      onChange={(e: any) => console.log('log do select I/D', e)}
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
          <Deliveries openInfos={showDeliveryInfos.openInfo}>
            <DeliveryTitle>
              <div className="title-delivery">
                Primeira entrega
                <span>-</span>
                <div className="date">
                  <IconCalendar /> 13/03/2023
                </div>
              </div>
              <div
                className="icon-arrow"
                onClick={() =>
                  setShowDeliveryInfos({
                    deliveryId: 1,
                    openInfo: showDeliveryInfos.openInfo ? false : true
                  })
                }
              >
                {showDeliveryInfos.deliveryId === 1 && showDeliveryInfos.openInfo ? (
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
                    {[0].map((row: any, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td style={{ minWidth: '150px' }}>
                          Produto {index + 1} com texto gigante{' '}
                        </td>
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
                              value={descriptionText.inputId === index ? descriptionText.text : ''}
                              maxLength={40}
                              type={'text'}
                              disabled={descriptionText.inputId !== index}
                              onChange={(e: any) =>
                                setDescriptionText({
                                  inputId: index,
                                  text: e.target.value.slice(0, 40)
                                })
                              }
                              //   error={error?.date_start}
                            />
                            <EditableFormat
                              className={descriptionText.inputId === index ? 'edit' : ''}
                              onClick={() => {
                                setDescriptionText({ inputId: index, text: '' });
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
                              value={editFormat.productIndex === index ? formatType : ''}
                              disabled={
                                editFormat.productIndex === index && editFormat.editable
                                  ? false
                                  : true
                              }
                              onChange={(e: any) => setFormatType(e.target.value)}
                              //   error={error?.date_start}
                            />
                            <EditableFormat
                              className={editFormat.productIndex === index ? 'edit' : ''}
                              onClick={() => {
                                setEditFormat({
                                  productIndex: index,
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
                            value={''}
                            onChange={(e: any) => console.log('log do select type', e)}
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
                            value={''}
                            onChange={(e: any) => console.log('log do select I/D', e)}
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
          <NewDelivery>
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
