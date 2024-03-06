import ActivityCard from "../cards/ActivityCard";
import { fetchStravaActivities } from "../../lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { mockedActivities } from "@/app/utils/mock";

export default async function LastActivity({mocked} : {mocked?:boolean}) {

        let activities:StravaActivitiesType = [];
      
        if(mocked) {
             activities = mockedActivities.sort((a, b) =>  {
                return +new Date(b.start_date_local) - +new Date(a.start_date_local)});
        } else {
             activities = await fetchStravaActivities("athlete/activities", {page: 1, per_page: 30});
        }


    return (
        <section className="activity-last">
            <ActivityCard activity={activities[0]} />
        </section>
    )
}