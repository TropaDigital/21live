// React
import { useEffect, useState } from 'react';

import { fetchChannels, fetchEpg } from './helpers';

import { Channel, Program, useEpg } from 'planby';

// Import theme
import { theme } from './helpers/theme';
import moment from 'moment';

// Example of globalStyles
// const globalStyles = `
// @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;500;600&display=swap');
// .planby {
//   font-family: "Antonio", system-ui, -apple-system,
//     /* Firefox supports this but not yet system-ui */ "Segoe UI", Roboto,
//     Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; /* 2 */
// }
// `;

interface AppDataProps {
  starterDate: string;
  finishDate: string;
  data: any;
  taskDate: string;
}

export function useApp({ starterDate, finishDate, data, taskDate }: AppDataProps) {
  const [isToShowLine, setIsToShowLine] = useState<boolean>(true);
  // const [channels, setChannels] = React.useState<Channel[]>([]);
  // const [epg, setEpg] = React.useState<Program[]>([]);
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const channelsData = data ? handleUsers(data) : [];
  const epgData = data ? [].concat(...data.map(handleUserTasks)) : [];
  // const epgData = React.useMemo(() => epg, [epg]);
  const today = moment().format('YYYY-MM-DD');

  useEffect(() => {
    if (moment(taskDate).isSame(today)) {
      setIsToShowLine(true);
    } else {
      setIsToShowLine(false);
    }
  }, [taskDate, today]);

  function handleUsers(dataArray: any[]) {
    return dataArray?.map((item) => ({
      uuid: item.user_id,
      type: 'channel',
      title: item.name,
      country: 'any',
      provider: '1234',
      logo: '',
      year: 'empty'
    }));
  }

  function handleUserTasks(tasksArray: any) {
    const channelUuid = tasksArray.user_id;

    return tasksArray?.agenda.map((item: any, index: number) => {
      const isPause = item.type;
      const id = channelUuid + index;
      const description = item.title || 'Pausa';
      const since = String(moment(item.start).format('YYYY-MM-DDTHH:mm:ss'));
      const till = String(moment(item.end).format('YYYY-MM-DDTHH:mm:ss'));
      const image = '';

      return {
        id,
        description,
        title: description,
        isYesterday: false,
        since,
        till,
        isPause,
        channelUuid,
        image
      };
    });
  }

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 7200,
    sidebarWidth: 5,
    itemHeight: 72,
    isSidebar: false,
    isTimeline: true,
    isLine: isToShowLine,
    startDate: starterDate,
    endDate: finishDate,
    isBaseTimeFormat: false,
    theme
  });

  // const handleFetchResources = React.useCallback(async () => {
  //   setIsLoading(false);
  //   const epg = await fetchEpg();
  //   const channels = await fetchChannels();
  //   setEpg(epg as Program[]);
  //   setChannels(channels as Channel[]);
  //   setIsLoading(false);
  // }, []);

  // React.useEffect(() => {
  //   handleFetchResources();
  // }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps };
}
