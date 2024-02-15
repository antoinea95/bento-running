"use client";

import { StravaTotal } from "@/app/types/schema";
import {
  BarChart,
  Bar,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const MonthChart = ({ data }: { data: StravaTotal[] }) => {

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
    <BarChart
      data={data}
      margin={{ top: 0, right: 60, left: 5, bottom: 0 }}
      width={420}
      height={120}
    >
      <YAxis  stroke="#fc4c01" strokeWidth={1} tickSize={3} tickMargin={10} type="number" fontWeight={900} fontSize={12}/>
      <XAxis dataKey="date" stroke="#fc4c01" strokeWidth={1} fontSize={12} tickSize={3} tickMargin={15} fontWeight={900} fontStyle={12} />
      <Tooltip content={<CustomTooltip />} cursor={{fill:"#fc4c01", fillOpacity:0.1}} />
      <Bar dataKey="kilometers" fill="#fc4c01" />
    </BarChart>
  );
};
