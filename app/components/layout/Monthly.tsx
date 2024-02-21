
import { calculateMonthlyTotalRuns } from "@/app/utils/helpers";
import { MonthChart } from "../charts/MonthChart";
import { fetchAllActivities } from "@/app/lib/strava";

export default async function Monthly() {

    const activities = await fetchAllActivities();
    const monthly = calculateMonthlyTotalRuns(activities);

    // const monthly = [
    //     {
    //         date: "Jan.",
    //         kilometers: 123
    //     },
    //     {
    //         date: "Feb.",
    //         kilometers: 345
    //     },
    // ]

    return (
        <div className="chart">
            <MonthChart data={monthly} />
        </div>
    )


}