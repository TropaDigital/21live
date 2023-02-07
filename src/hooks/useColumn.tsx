import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

function useColumn() {
  const [column, setColumn] = useLocalStorage("COLUMN", []);

  const addColumn = useCallback(
    (item: any) => {
      const newItem = {
        card_id: column.length + 1,
        flow_id: column.length + 1,
        user_id: '15852',
        name: 'NOVA COLUNA',
        email_alert: false,
        necessary_upload: false,
        step: 1,
        next_step: 2,
        previous_step: 0,
        tasks: []
      }
      setColumn([...column, newItem]);
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
    (id: any, name: any, value: any) => {
      column[id][name] = value
      setColumn([...column])
    },
    [column, setColumn]
  );

  const deleteColumn = useCallback(
    (itemId: any) => {
      setColumn(column.filter((item: any) => item.card_id !== itemId));
    },
    [column, setColumn]
  );

  const moveObject = useCallback((
    to: any, from: any
  ) => {
    column.splice(to, 0, column.splice(from, 1)[0]);
    return setColumn(column);

  }, [column, setColumn]);

  return {
    column,
    addColumn,
    updateColumn,
    deleteColumn,
    updateParcialColumn,
    moveObject
  };
}

export default useColumn;
