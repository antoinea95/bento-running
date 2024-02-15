
import { fetchStravaActivities } from "@/app/lib/strava";
import { getEpochTime, getWeekSummary } from "@/app/utils/helpers";
import { Flame } from "lucide-react";

export default async function WeekSummary() {

    const {previousWeekEpoch} = getEpochTime(new Date())
    const activities = await fetchStravaActivities('athlete/activities', {page: 1, per_page: 200, after: previousWeekEpoch})
    const weekSummary = getWeekSummary(activities)

    const weekMock = {
        distance: "30.34km",
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