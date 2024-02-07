import { calculateWeeklyTotalRuns, getPreviousWeekAndMonthDates } from "@/app/utils/helpers";
import { fetchStravaApi } from "@/app/lib/strava";
import { StravaActivitieType, StravaActivitiesSchema, StravaActivitiesType } from "@/app/types/schema";
import { WeekChart } from "../charts/WeekChart";

export default async function Activities() {

    const {previousMonthEpoch} = getPreviousWeekAndMonthDates(new Date())
    
    const activities = await fetchStravaApi <StravaActivitiesType>(`https://www.strava.com/api/v3/athlete/activities?after=${previousMonthEpoch}`, StravaActivitiesSchema);
    console.log(activities);

    if(!activities.data) {
        return <p>Loading ...</p>
    }


    const runActivities = activities.data.filter((activities) => (activities.type === "Run"));
    const weekly = calculateWeeklyTotalRuns(runActivities);

    return (
        <article>
            <h2>Activities</h2>
            <WeekChart data={weekly} />
        </article>
    )
}