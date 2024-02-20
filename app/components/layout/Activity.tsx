import ActivityCard from "../cards/ActivityCard";
import LoadMore from "../cards/LoadMore";
import { fetchStravaActivities } from "../../lib/strava";

export default async function Activity() {

    const activities = await fetchStravaActivities("athlete/activities", {page: 1, per_page: 30});
    
    const sortActivities = activities.sort((a, b) =>  {
        return +new Date(b.start_date_local) - +new Date(a.start_date_local);
    }).filter((activity, index) => index !== 0);

    return (
        <section className="activity">
            {sortActivities.map((activity) => (
               <ActivityCard activity={activity} key={activity.id}/>
            ))}
            <LoadMore />
        </section>
    )
}