import { StatType } from "@/app/types/schema";
import { Clock, Flame, Mountain, Route } from "lucide-react";

export default function StatCard({
  data,
  title,
}: {
  data: StatType;
  title: string;
}) {
  const handleConversion = (numberToConvert: number, division: number) => {
    const conversion = numberToConvert / division;
    return Math.round(conversion);
  };

  return (
    <div className="stats-content">
      <p className="stats-content_item">
        <Flame className="stats-content_item_icon" /> {data.count} runs
      </p>
      <p className="stats-content_item">
        <Route className="stats-content_item_icon" />{" "}
        {handleConversion(data.distance, 1000)} km
      </p>
      <p className="stats-content_item">
        <Clock className="stats-content_item_icon" />{" "}
        {handleConversion(data.moving_time, 3600)} h
      </p>
      <p className="stats-content_item">
        <Mountain className="stats-content_item_icon" />{" "}
        {Math.round(data.elevation_gain)} m
      </p>
    </div>
  );
}
