import { calculateWeeklyTotalRuns, getEpochTime } from "@/app/utils/helpers";
import { WeekChart } from "../charts/WeekChart";
import { fetchStravaActivities } from "@/app/lib/strava";



export default async function Weekly() {

    const {previousLastFoursWeeksEpoch} = getEpochTime(new Date())
    const activities = await fetchStravaActivities("athlete/activities", {page:1, per_page: 200, after: previousLastFoursWeeksEpoch})
    const weekly = calculateWeeklyTotalRuns(activities);

    return (
        <div className="chart">
            <WeekChart data={weekly} />
        </div>
    )
}