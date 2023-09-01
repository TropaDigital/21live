import React from 'react';

import { fetchChannels, fetchEpg } from './helpers';

import { Channel, Program, useEpg } from 'planby';

// Import theme
import { theme } from './helpers/theme';

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
}

export function useApp({ starterDate, finishDate }: AppDataProps) {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [epg, setEpg] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const channelsData = React.useMemo(() => channels, [channels]);
  const epgData = React.useMemo(() => epg, [epg]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 7200,
    sidebarWidth: 5,
    itemHeight: 72,
    isSidebar: false,
    isTimeline: true,
    isLine: true,
    startDate: starterDate,
    endDate: finishDate,
    isBaseTimeFormat: false,
    theme
  });

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(false);
    const epg = await fetchEpg();
    const channels = await fetchChannels();
    setEpg(epg as Program[]);
    setChannels(channels as Channel[]);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}
