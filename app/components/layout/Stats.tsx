
import { fetchStravaStat} from "@/app/lib/strava"
import StatCard from "../cards/StatCard";

export default async function Stats() {

    const stats = await fetchStravaStat()

    // const stats = {
    //     all_run_totals: {
    //         count: 23,
    //         distance: 23456,
    //         moving_time: 123467,
    //         elevation_gain: 345
    //     }
    // }

    return (
        <div className="stats">
            <StatCard data={stats.all_run_totals} title={"All times"} />
        </div>
    )

}