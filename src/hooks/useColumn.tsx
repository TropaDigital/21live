import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "./useLocalStorage";
import { columnDefault } from "../utils/dataDefault";

function useColumn() {
  const [column, setColumn] = useLocalStorage("COLUMN", []);

  const addColumn = useCallback(
    (item: any) => {
      const newItem = {
        card_id: column.length + 1,
        flow_id: 1,
        user_id: '15852',
        name: 'NOVA COLUNA',
        email_alert: false,
        necessary_upload: false,
        step: 1,
        next_step: 2,
        previous_step: 0,
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
    (id: number, title: string) => {
      column[id].title = title;
      setColumn([...column]);
    },
    [column, setColumn]
  );

  const deleteColumn = useCallback(
    (itemId: any) => {
      setColumn(column.filter((item: any) => item.card_id !== itemId));
    },
    [column, setColumn]
  );

  return {
    column,
    addColumn,
    updateColumn,
    deleteColumn,
    updateParcialColumn,
  };
}

export default useColumn;
