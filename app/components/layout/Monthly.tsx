
import { calculateMonthlyTotalRuns } from "@/app/utils/helpers";
import { MonthChart } from "../charts/MonthChart";
import { fetchAllActivities } from "@/app/lib/strava";

export default async function Monthly() {

    const activities = await fetchAllActivities();
    const monthly = calculateMonthlyTotalRuns(activities);

    return (
        <div className="chart">
            <MonthChart data={monthly} />
        </div>
    )


}