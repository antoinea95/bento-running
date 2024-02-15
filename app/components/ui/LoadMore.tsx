"use client"

import { StravaActivitiesType } from "@/app/types/schema"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import { Spinner } from "./Spinner";
import { fetchStravaActivities } from "@/app/lib/strava";
import ActivityCard from "../ActivityCard";

export default function LoadMore() {

    const [activities, setActivities] = useState<StravaActivitiesType>([]);
    const [pageLoaded, setPageLoaded] = useState(1);

    const {ref, inView} = useInView();

    const loadMoreActivities = async () => {
        const nextPage = pageLoaded + 1;
        const newActivities = await fetchStravaActivities("athlete/activities", {page: nextPage, per_page: 30}) ?? [];
        const newActivitiesSort = newActivities.sort((a, b) =>  {
            return +new Date(b.start_date_local) - +new Date(a.start_date_local);
        });
        setActivities((prevActivities: StravaActivitiesType) => [...prevActivities, ...newActivitiesSort]);
        setPageLoaded(nextPage);
    }

    useEffect(() => {
        if(inView) {
            loadMoreActivities();
        }
    }, [inView])

    return (

        <>
          {activities.map((activity) => (
               <ActivityCard activity={activity} key={activity.id}/>
            ))}
            <div ref={ref}>
            <Spinner />
            </div>
        </>
    )

}