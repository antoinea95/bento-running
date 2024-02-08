import { fetchStravaApi, useFetchActivities } from "@/app/lib/strava";
import { StravaActivitiesSchema, StravaActivitiesType } from "@/app/types/schema";

export default async function AllTimes() {

    const activities = await useFetchActivities(null);
    console.log(activities.length)


    return (
        <article className="alltimes">
            <h2>All times</h2>
        </article>
    )


}