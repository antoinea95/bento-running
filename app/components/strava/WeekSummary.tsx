import { getEpochTime, getWeekSummary } from "@/app/utils/helpers";
import { fetchActivities } from "@/app/lib/strava";
import { Flame } from "lucide-react";

export default async function WeekSummary() {

    // const {previousWeekEpoch} = getEpochTime(new Date())
    // const activities = await fetchActivities(previousWeekEpoch)
    // const weekSummary = getWeekSummary(activities);

    const weekMock = {
        distance: "30km",
        time: "2h34mn23s",
        elevation: "89m"
    }

    return (
        <section className="summary-container">
            <h2 className="summary-title">
                <Flame color="#fc4c01"/>
                This week
            </h2>
            <div className="summary-content">
                {Object.keys(weekMock).map((key) => (
                    <div className="summary-content_item" key={key}>
                        <h3>{key}</h3>
                        <p>{weekMock[key as keyof typeof weekMock]}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}