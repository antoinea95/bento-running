import { calculateWeeklyTotalRuns, getPreviousWeekAndMonthDates } from "@/app/utils/helpers";
import { fetchStravaApi } from "@/app/lib/strava";
import { StravaActivitieType, StravaActivitiesSchema, StravaActivitiesType } from "@/app/types/schema";

export default async function Activities() {

    const {previousMonthEpoch} = getPreviousWeekAndMonthDates(new Date())
    
    const activities = await fetchStravaApi <StravaActivitiesType>(`https://www.strava.com/api/v3/athlete/activities?after=${previousMonthEpoch}`, StravaActivitiesSchema);

    if(!activities.data) {
        return <p>Loading ...</p>
    }


    const runActivities = activities.data.filter((activities) => (activities.type === "Run"));
    const weekly = calculateWeeklyTotalRuns(runActivities);
    console.log(weekly);

    return (
        <article>
            <h2>Activities</h2>
        </article>
    )
}