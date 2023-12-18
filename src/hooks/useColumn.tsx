import { useCallback, useState } from 'react';

import useLocalStorage from './useLocalStorage';

function useColumn() {
  const [column, setColumn] = useState<any>([]);
  const [state, setState] = useLocalStorage('COLUMN', []);

  const addColumn = useCallback(
    (userId: any, flowId: any) => {
      const newItem = {
        flow_id: String(flowId),
        // card_id: String(column.length + 1),
        step: 0,
        function_id: '0',
        name: 'Novo card',
        necessary_upload: 'false',
        email_alert: 'false',
        necessary_responsible: 'true',
        // manager_approve: 'false',
        tenant_approve: 'false',
        // previous_step: '0',
        ticket_status_id: '0'
        // approver: '0'
        // tasks: [],
      };

      const updateColumn = [...column.slice(0, -1), newItem, column[column.length - 1]];
      setColumn(updateColumn);
    },
    [column, setColumn]
  );

  const updateColumn = useCallback(
    (updatedItem: any) => {
      const updatedItems: any = column.map((item: any) => {
        if (item.card_id === updatedItem.card_id) {
          return updatedItem;
        }
        return item;
      });
      setColumn(updatedItems);
    },
    [column, setColumn]
  );

  const updateParcialColumn = useCallback(
    (id: string, name: string, value: string) => {
      if (name === 'previous_step') {
        column[id][name] = value.replace(/[^\d.-]/g, '');
        setColumn([...column]);
      } else if (name === 'manager_approve') {
        column[id]['previous_step'] = '0';
        column[id][name] = value;
        setColumn([...column]);
      } else {
        column[id][name] = value;
        setColumn([...column]);
      }
      // column[id][name] = value.replace(/[^\d.-]/g, '');
    },
    [column, setColumn]
  );

  const deleteColumn = useCallback(
    (itemId: any) => {
      setColumn(column.filter((item: any) => item.card_id !== itemId));
      setState(column.filter((item: any) => item.card_id !== itemId));
    },
    [column, setColumn]
  );

  const moveObject = useCallback(
    (to: any, from: any) => {
      const newArray = [...column];
      const [removedObject] = newArray.splice(from, 1);
      newArray.splice(to, 0, removedObject);
      setColumn(newArray);
    },
    [column, setColumn]
  );

  return {
    column,
    setColumn,
    addColumn,
    updateColumn,
    deleteColumn,
    updateParcialColumn,
    moveObject
  };
}

export default useColumn;
