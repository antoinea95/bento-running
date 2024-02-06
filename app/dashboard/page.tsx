import { redirect } from "next/navigation";
import Header from "../components/Header"
import { Stats } from "../components/strava/Stats"
import { fetchStravaApi, getStravaSession } from "../lib/strava"
import { StravaProfileSchema, StravaProfileType } from "../types/schema";
import SignoutButton from "../components/auth/signoutBtn";
import Activities from "../components/strava/Activities";


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
            <Activities />
            <Stats />
        </article>
        </>
    )
}