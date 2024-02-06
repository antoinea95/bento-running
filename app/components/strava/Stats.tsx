import { fetchStravaApi, getStravaSession } from "@/app/lib/strava"
import { StravaStatSchema, StravaStatType } from "@/app/types/schema";
import DataCard from "../ui/DataCard";

export const Stats = async () => {
    const session = await getStravaSession();
    const id = session.id;
    const stats = await fetchStravaApi <StravaStatType>(`https://www.strava.com/api/v3/athletes/${id}/stats`, StravaStatSchema);

    if(!stats.data) {
        return <p>Loading ...</p>
    }


    return (
        <article className="stats-all">
            <DataCard data={stats.data.recent_run_totals} title={"Last 4 weeks"} />
            <DataCard data={stats.data.ytd_run_totals} title={"This year"} />
            <DataCard data={stats.data.all_run_totals} title={"All times"} />
        </article>
    )

}