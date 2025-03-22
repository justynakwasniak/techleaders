import { format,addDays } from "date-fns";

type ScheduleHeaderProps = {
  startDate: Date;
  changeWeek: (days: number) => void;
};

const ScheduleHeader = ({ startDate, changeWeek }: ScheduleHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => changeWeek(-7)} className="p-2">⬅</button>
      <h2 className="text-lg font-bold">
        {format(startDate, "dd/MM")} - {format(addDays(startDate, 6), "dd/MM")}
      </h2>
      <button onClick={() => changeWeek(7)} className="p-2">➡</button>
    </div>
  );
};

export default ScheduleHeader;
