import { calculateWeeklyTotalRuns, getEpochTime } from "@/app/utils/helpers";
import { WeekChart } from "../charts/WeekChart";
import { LineChart } from "lucide-react";
import { fetchStravaActivities } from "@/app/lib/strava";



export default async function Weekly() {

    const {previousMonthEpoch} = getEpochTime(new Date())
    const activities = await fetchStravaActivities("athlete/activities", {page:1, per_page: 200, after: previousMonthEpoch})
    const weekly = calculateWeeklyTotalRuns(activities);


    const weeklyMock = [
        {date: "15 - 22 jan.", kilometers: 40},
        {date: "22 - 29 jan.", kilometers: 35},
        {date: "29jan. - 5 feb.", kilometers: 63},
        {date: "5 - 12 feb.", kilometers: 87},
    ] 

    return (
        <section className="chart-container">
            <h2 className="chart-title">
                <LineChart color="#fc4c01" style={{marginRight: "1rem"}}/>
                History
            </h2>
                <WeekChart data={weekly} />
        </section>
    )
}