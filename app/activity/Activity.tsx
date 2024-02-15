import { Flame } from "lucide-react";
import ActivityCard from "../components/ActivityCard";
import LoadMore from "../components/ui/LoadMore";
import { fetchStravaActivities } from "../lib/strava";

export default async function Activity() {

    const activities = await fetchStravaActivities("athlete/activities", {page: 1, per_page: 30});;
    const sortActivities = activities.sort((a, b) =>  {
        return +new Date(b.start_date_local) - +new Date(a.start_date_local);
    });
    

    return (
        <section className="activity">
             <h2 className="activity-title">
                <Flame color="#fc4c01" style={{marginRight: "1rem"}}/>
                Activity
            </h2>
            {sortActivities.map((activity) => (
               <ActivityCard activity={activity} key={activity.id}/>
            ))}
            <LoadMore />
        </section>
    )
}