
import { fetchStravaStat} from "@/app/lib/strava"
import StatCard from "../cards/StatCard";

export default async function Stats() {

    const stats = await fetchStravaStat()

    return (
        <div className="stats">
            <StatCard data={stats.all_run_totals} title={"All times"} />
        </div>
    )

}