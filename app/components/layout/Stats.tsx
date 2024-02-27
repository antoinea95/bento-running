
import { fetchStravaStat} from "@/app/lib/strava"
import StatCard from "../cards/StatCard";
import { StravaStatType } from "@/app/types/schema";
import { mockedStat } from "@/app/utils/mock";

export default async function Stats({mocked} : {mocked?:boolean}) {

    let stats: StravaStatType;

    if(mocked) {
        stats = mockedStat;
    } else {
        stats = await fetchStravaStat();
    }


    return (
        <div className="stats">
            <StatCard data={stats.all_run_totals} title={"All times"} />
        </div>
    )

}