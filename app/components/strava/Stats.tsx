
import { fetchStravaStat} from "@/app/lib/strava"
import { Gauge } from "lucide-react";
import StatCard from "../ui/StatCard";

export default async function Stats() {

    // const stats = await fetchStravaStat()

    const mockedStats = {
        recent_run_totals: {
            count: 23,
            distance: 7645,
            moving_time: 7654,
            elevation_gain: 350
        },

        ytd_run_totals: {
            count: 53,
            distance: 109346,
            moving_time: 987654,
            elevation_gain: 4567
        },

        all_run_totals: {
            count: 1343,
            distance: 1234567,
            moving_time: 846788463,
            elevation_gain: 1345678
        },
    }


    return (
        <>
            <StatCard data={mockedStats.recent_run_totals} title={"Last 4 weeks"} />
            <StatCard data={mockedStats.ytd_run_totals} title={"This year"} />
            <StatCard data={mockedStats.all_run_totals} title={"All times"} />
        </>
    )

}