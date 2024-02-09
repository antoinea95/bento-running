import Header from "../components/Header"
import { Stats } from "../components/strava/Stats"
import WeekSummary from "../components/strava/WeekSummary";
import Weekly from "../components/strava/Weekly";
import Monthly from "../components/strava/Monthly";
import { Suspense } from "react";


export default async function Dashboard() {


    return (
        <>
        <Header />
        <Suspense fallback={<div>LOADING</div>}>
        <article>
            <WeekSummary />
            <Weekly />
            <Monthly />
        </article>
        </Suspense>
        </>
    )
}