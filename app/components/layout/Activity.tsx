import ActivityCard from "../cards/ActivityCard";
import LoadMore from "../cards/LoadMore";
import { fetchStravaActivities } from "../../lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { mockedActivities } from "@/app/utils/mock";
import { mock } from "node:test";

export default async function Activity({mocked} : {mocked?:boolean}) {

    let activities:StravaActivitiesType = [];

    if(mocked) {
         activities = mockedActivities;
    } else {
         activities = await fetchStravaActivities("athlete/activities", {page: 1, per_page: 30});
    }
    
    const sortActivities = activities.sort((a, b) =>  {
        return +new Date(b.start_date_local) - +new Date(a.start_date_local);
    }).filter((activity, index) => index !== 0);

    return (
        <section className="activity">
            {sortActivities.map((activity) => (
               <ActivityCard activity={activity} key={activity.id}/>
            ))}
            {!mocked ? <LoadMore/> : <div className="activity-loading">
        <p className="activity-loading_spinner"> No more activities</p>
        </div>}
        </section>
    )
}