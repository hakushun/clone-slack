import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getTimeFromNow = (timestamp: number): string =>
  dayjs(timestamp).fromNow();

export const getTimestamp = (): number => dayjs().valueOf();
