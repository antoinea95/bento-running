import { getPreviousWeekAndMonthDates, getWeekSummary } from "@/app/utils/helpers";
import { useFetchActivities } from "@/app/lib/strava";
import { Flame } from "lucide-react";

export default async function WeekSummary() {

    const {previousWeekEpoch} = getPreviousWeekAndMonthDates(new Date())
    const activities = await useFetchActivities(previousWeekEpoch)
    const weekSummary = getWeekSummary(activities);

    return (
        <section className="summary-container">
            <h2 className="summary-title">
                <Flame color="#fc4c01"/>
                This week
            </h2>
            <div className="summary-content">
                {Object.keys(weekSummary).map((key) => (
                    <div className="summary-content_item" key={key}>
                        <h3>{key}</h3>
                        <p>{weekSummary[key as keyof typeof weekSummary]}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}