

import { format, fromUnixTime } from "date-fns";

export const formatTime = (timestamp: number): string => {
  return format(fromUnixTime(timestamp), "HH:mm");
};
