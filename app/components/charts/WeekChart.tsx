"use client";

import { StravaWeeklyTotal } from "@/app/types/schema";
import {
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

console.log(data)

  return (
    <section className="chart-container">
    <LineChart
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      width={700}
      height={200}
    >
      <CartesianGrid  stroke="rgba(0,0,0,0.1)"/>
      <YAxis  stroke="#fc4c01" strokeWidth={1} tickSize={0} tickMargin={10} type="number" fontWeight={900} fontSize={12}/>
      <XAxis dataKey="week" stroke="#fc4c01" strokeWidth={1} fontSize={12} tickSize={0} tickMargin={15} fontWeight={900} fontStyle={12} />
      <Tooltip content={<CustomTooltip />} />
      <Line type="linear" dataKey="kilometers" stroke="#fc4c01" strokeWidth={3} />
    </LineChart>
    </section>
  );
};
