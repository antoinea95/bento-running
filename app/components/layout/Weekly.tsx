import { calculateWeeklyTotalRuns, getEpochTime } from "@/app/utils/helpers";
import { WeekChart } from "../charts/WeekChart";
import { fetchStravaActivities } from "@/app/lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { mockedActivities } from "@/app/utils/mock";



export default async function Weekly({mocked} : {mocked?:boolean}) {

    const {previousLastFoursWeeksEpoch} = getEpochTime(new Date())
    let activities:StravaActivitiesType = [];

    if(mocked) {
         activities = mockedActivities.sort((a, b) =>  {
            return +new Date(a.start_date_local) - +new Date(b.start_date_local)});
    } else {
         activities = await fetchStravaActivities("athlete/activities", {page:1, per_page: 200, after: previousLastFoursWeeksEpoch})
    }

    const weekly = calculateWeeklyTotalRuns(activities);

    return (
        <div className="chart">
            <WeekChart data={weekly} />
        </div>
    )
}