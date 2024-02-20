
import { fetchStravaActivities } from "@/app/lib/strava";
import { getEpochTime, getWeekSummary } from "@/app/utils/helpers";

export default async function WeekSummary() {

    const {previousWeekEpoch} = getEpochTime(new Date())
    const activities = await fetchStravaActivities('athlete/activities', {page: 1, per_page: 200, after: previousWeekEpoch})
    const weekSummary = getWeekSummary(activities)

    return (
            <div className="summary">
                {Object.keys(weekSummary).map((key) => (
                    <div className="summary-item" key={key}>
                        <h3>{key}</h3>
                        <p>{weekSummary[key as keyof typeof weekSummary]}</p>
                    </div>
                ))}
            </div>
    )
}