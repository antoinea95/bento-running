
import { fetchStravaStat} from "@/app/lib/strava"
import DataCard from "../ui/DataCard";
import { Gauge } from "lucide-react";

export default async function Stats() {

    const stats = await fetchStravaStat()

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
        <article className="stats-container">
            <h2 className="stats-title">
                <Gauge color="#fc4c01" style={{marginRight: "1rem"}} />
                Global stats
            </h2>
            <DataCard data={stats.recent_run_totals} title={"Last 4 weeks"} />
            <DataCard data={stats.ytd_run_totals} title={"This year"} />
            <DataCard data={stats.all_run_totals} title={"All times"} />
        </article>
    )

}