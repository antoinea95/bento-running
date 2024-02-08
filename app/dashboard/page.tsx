import Header from "../components/Header"
import { Stats } from "../components/strava/Stats"
import { fetchStravaApi, getStravaSession } from "../lib/strava"
import { StravaProfileSchema, StravaProfileType } from "../types/schema";
import History from "../components/strava/History";
import WeekSummary from "../components/strava/WeekSummary";
import AllTimes from "../components/strava/AllTimes";


export default async function Dashboard() {

    const session = await getStravaSession();
     const profile = await fetchStravaApi <StravaProfileType>("https://www.strava.com/api/v3/athlete", StravaProfileSchema);

     if(!profile.data) {
        return <>
            <p>Loading ...</p>
        </>
     }

    

     

    return (
        <>
        <Header profile={profile.data} />
        <article>
            <WeekSummary />
            <History />
            <AllTimes />
            <Stats />
        </article>
        </>
    )
}