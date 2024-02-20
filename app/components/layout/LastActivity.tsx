import ActivityCard from "../cards/ActivityCard";
import { fetchStravaActivities } from "../../lib/strava";

export default async function LastActivity() {

    const activities = await fetchStravaActivities("athlete/activities", {page: 1, per_page: 1});
    

    return (
        <section className="activity-last">
            <ActivityCard activity={activities[0]} />
        </section>
    )
}