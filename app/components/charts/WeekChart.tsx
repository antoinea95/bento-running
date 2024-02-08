"use client";

import { StravaWeeklyTotal } from "@/app/types/schema";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const WeekChart = ({ data }: { data: StravaWeeklyTotal[] }) => {

  const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active) {
    return (
        <div className="chart-tooltip">
        <p className="chart-tooltip_label">{`${payload?.[0].value} KM`}</p>
        </div>
    );
    }

    return null;
};


  return (
    <AreaChart
      data={data}
      margin={{ top: 5, right: 60, left: 5, bottom: 5 }}
      width={600}
      height={150}
    >
      <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#fc4c01" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#fc4c01" stopOpacity={0}/>
      </linearGradient>
      </defs>
      <YAxis  stroke="#fc4c01" strokeWidth={1} tickSize={3} tickMargin={10} type="number" fontWeight={900} fontSize={12}/>
      <XAxis dataKey="week" stroke="#fc4c01" strokeWidth={1} fontSize={12} tickSize={3} tickMargin={15} fontWeight={900} fontStyle={12} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="linear" dataKey="kilometers" stroke="#fc4c01" strokeWidth={2}  fillOpacity={1} fill="url(#gradient)" />
    </AreaChart>
  );
};
