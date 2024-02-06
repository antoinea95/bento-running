import { getPreviousWeekAndMonthDates } from "@/app/helpers/helpers";
import { fetchStravaApi } from "@/app/lib/strava";
import { StravaActivitieType, StravaActivitiesSchema, StravaActivitiesType } from "@/app/types/schema";

export default async function Activities() {
    
    const activities = await fetchStravaApi <StravaActivitiesType>("https://www.strava.com/api/v3/athlete/activities?after=1704067200", StravaActivitiesSchema);

    if(!activities.data) {
        return <p>Loading ...</p>
    }


    const runActivities = activities.data.filter((activities) => (activities.type === "Run"));

    return (
        <article>
            <h2>Activities</h2>
        </article>
    )
}