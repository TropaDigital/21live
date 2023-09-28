/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'stopwatchState';

type StopwatchState = {
  isRunning: boolean;
  elapsedTime: number;
};

type TitleInfos = {
  idNumber: string;
  numberTask: string;
  titleTask: string;
  monthTask: string;
  client_task: string;
  typeTask: string;
  quantityTask: string;
  contract_task: string;
};

type StopwatchContextType = {
  setInitialTime: (value: any) => void;
  state: StopwatchState;
  start: () => void;
  stop: () => void;
  reset: () => void;
  titleTaskInfos: TitleInfos;
  setTaskInfo: (info: TitleInfos) => void;
  handleClock: (value: any) => void;
  clockInfos: ClockInfos;
};

type ClockInfos = {
  task_id: string;
  delivery_id?: string;
  products_delivery_id?: string;
};

const StopwatchContext = createContext<StopwatchContextType>({} as StopwatchContextType);

function StopwatchProvider({ children }: any) {
  const storedState = localStorage.getItem(STORAGE_KEY);
  const initialElapsed = storedState ? JSON.parse(storedState).elapsedTime : 0;

  const [state, setState] = useState({
    isRunning: false,
    elapsedTime: initialElapsed
  });

  const [titleTaskInfos, setTitleInfos] = useState({
    idNumber: '',
    numberTask: '',
    titleTask: '',
    monthTask: '',
    client_task: '',
    typeTask: '',
    quantityTask: '',
    contract_task: ''
  });

  const [clockInfos, setClockInfos] = useState<ClockInfos>({
    task_id: '',
    delivery_id: '',
    products_delivery_id: ''
  });

  let intervalId: NodeJS.Timeout;

  const setInitialTime = (value: any) => {
    setState({
      isRunning: value.isRunning,
      elapsedTime: value.elapsedTime
    });
  };

  const start = () => {
    if (!state.isRunning) {
      setState({ ...state, isRunning: true });
    }
  };

  const stop = () => {
    if (state.isRunning) {
      setState({ ...state, isRunning: false });
    }
  };

  const reset = () => {
    setState({ isRunning: false, elapsedTime: 0 });
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    if (state.isRunning) {
      intervalId = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          elapsedTime: prevState.elapsedTime + 1
        }));
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isRunning]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setTaskInfo = (info: TitleInfos) => {
    setTitleInfos(info);
  };

  const handleClock = (value: any) => {
    setClockInfos(value);
  };

  return (
    <StopwatchContext.Provider
      value={{
        state,
        setInitialTime,
        start,
        stop,
        reset,
        titleTaskInfos,
        setTaskInfo,
        handleClock,
        clockInfos
      }}
    >
      {children}
    </StopwatchContext.Provider>
  );
}

function useStopWatch(): StopwatchContextType {
  const context = useContext(StopwatchContext);

  if (!context) {
    throw new Error('useStopWatch must be used within an StopWatchProvider');
  }

  return context;
}

export { StopwatchProvider, useStopWatch };
