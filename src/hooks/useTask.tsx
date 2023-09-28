import { useCallback } from 'react';

import useLocalStorage from './useLocalStorage';

function useTask() {
  const [column, setColumn] = useLocalStorage('COLUMN', []);

  const addTask = useCallback(
    (item: any, task: any) => {
      setColumn(
        column.map((obj: any) => {
          if (obj.card_id === item.card_id) {
            return {
              ...item,
              tasks: [...item.tasks, { ...task }]
            };
          }
          return { ...obj };
        })
      );
    },
    [column, setColumn]
  );

  // const updateTask = (
  //   columns: any,
  //   taskId: number,
  //   updatedTask: any
  // ) => {
  //   setBoards(
  //     columns.map((column: any) => {
  //       if (column.id === taskId) {
  //         return {
  //           ...column,
  //           tasks: column.tasks.map((task: any) => {
  //             if (task.id === updatedTask.id) {
  //               return {...task, ...updatedTask};
  //             }
  //             return {...task};
  //           }),
  //         };
  //       }
  //       return {...column};
  //     })
  //   );
  // };

  const deleteTask = (item: any, taskId: number) => {
    setColumn(
      column.map((row: any) => {
        if (row.card_id === item.card_id) {
          return {
            ...item,
            tasks: [...item.tasks.filter((obj: any) => obj.task_id !== taskId)]
          };
        }
        return { ...row };
      })
    );
  };

  return {
    column,
    addTask,
    // updateTask,
    deleteTask
  };
}

export default useTask;
