
import { calculateMonthlyTotalRuns, getEpochTime } from "@/app/utils/helpers";
import { MonthChart } from "../charts/MonthChart";
import { Medal } from "lucide-react";
import { fetchAllActivities } from "@/app/lib/strava";

export default async function Monthly() {

    // const activities = await fetchAllActivities();
    // const monthly = calculateMonthlyTotalRuns(activities);

    const monthlyMock = [
        {date: "Jan.", kilometers: 101},
        {date: "Feb.", kilometers: 123},
        {date: "Mar.", kilometers: 87},
        {date: "Apr.", kilometers: 23},
        {date: "May.", kilometers: 300},
        {date: "Jun.", kilometers: 234},
        {date: "Jul.", kilometers: 178},
        {date: "Aug.", kilometers: 93},
        {date: "Sep.", kilometers: 53},
        {date: "Oct.", kilometers: 33},
        {date: "Nov.", kilometers: 47},
        {date: "Dec.", kilometers: 340},
    ]

    return (
        <section className="chart-container">
            <h2 className="chart-title">
                <Medal color="#fc4c01" style={{marginRight: "1rem"}}/>
                This year
            </h2>
            <MonthChart data={monthlyMock} />
        </section>
    )


}