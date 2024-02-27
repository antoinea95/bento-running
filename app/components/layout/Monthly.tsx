
import { calculateMonthlyTotalRuns } from "@/app/utils/helpers";
import { MonthChart } from "../charts/MonthChart";
import { fetchAllActivities } from "@/app/lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { mockedActivities } from "@/app/utils/mock";

export default async function Monthly({mocked} : {mocked?:boolean}) {

    let activities:StravaActivitiesType = [];

    if(mocked) {
         activities = mockedActivities.sort((a, b) =>  {
            return +new Date(a.start_date_local) - +new Date(b.start_date_local)});
    } else {
         activities = await fetchAllActivities();
    }

    const monthly = calculateMonthlyTotalRuns(activities);

    return (
        <div className="chart">
            <MonthChart data={monthly} />
        </div>
    )


}