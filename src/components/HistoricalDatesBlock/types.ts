export type EventItem = {
  year: number;
  title: string;
  descr: string;
};

export type TimeSlice = {
  yearStart: number;
  yearEnd: number;
  label: string;
  events: EventItem[];
};

export type HistoricalDatesBlockProps = {
  slices: TimeSlice[];
  radius?: number;
  initialIndex?: number;
  className?: string;
};
