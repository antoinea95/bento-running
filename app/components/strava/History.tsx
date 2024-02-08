import { calculateWeeklyTotalRuns, getPreviousWeekAndMonthDates } from "@/app/utils/helpers";
import { fetchStravaApi, useFetchActivities } from "@/app/lib/strava";
import { StravaActivitiesSchema, StravaActivitiesType } from "@/app/types/schema";
import { WeekChart } from "../charts/WeekChart";
import { LineChart } from "lucide-react";

export default async function History() {

    const {previousMonthEpoch} = getPreviousWeekAndMonthDates(new Date())
    const activities = await useFetchActivities(previousMonthEpoch)
    const weekly = calculateWeeklyTotalRuns(activities);

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