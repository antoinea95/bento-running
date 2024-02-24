"use client"


import { fetchAllActivities, fetchStravaActivities } from "@/app/lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { getEpochTime } from "@/app/utils/helpers";
import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import SummaryCard from "../cards/SummaryCard";

export default function Summary() {

    const allPeriods = {
        "week": "This week",
        "month": "This month",
        "year": "This year",
    }

    const {previousWeekEpoch, previousMonthEpoch} = getEpochTime(new Date());
    const [period, setPeriod] = useState("week")
    const [showOptions, setShowOptions] = useState(false);
    const [activities, setActivities] = useState<StravaActivitiesType>([]);

    const getActiviesByPeriod = async () => {
        if(period === "week") {
            const weekActivities = await fetchStravaActivities('athlete/activities', {page: 1, per_page: 200, after: previousWeekEpoch})
            setActivities(weekActivities);
        }

        if(period === "month") {
            const monthActivities = await fetchStravaActivities('athlete/activities', {page: 1, per_page: 200, after: previousMonthEpoch})
            setActivities(monthActivities);
        }

        if(period === "year") {
            const yearActivities = await fetchAllActivities();
            setActivities(yearActivities)
        }
    }

    useEffect(() => {
        getActiviesByPeriod();
    }, [period])


    return (
        <>
        <div className="dashboard-item_title">
        <div className="icon-container">
        <Calendar className="icon" />
        </div>
        <div className="summary-select">
            <h2 className="summary-select_selected">
                {allPeriods[period as keyof typeof allPeriods]}
                <button 
                className={` summary-select_dropDown ${showOptions ? "summary-select_dropDown_open" : ""}`}
                onClick={() => setShowOptions(!showOptions)}
                >
                    <ChevronDown style={{padding: 0}}/>
                </button>
            </h2>
            <div className={` summary-select_options ${showOptions ? "summary-select_options_open" : ""}`}>
            {Object.keys(allPeriods).map((key) => (
                key!== period && <button key={key} onClick={() => {setPeriod(key); setShowOptions(false)}} className="summary-select_btn">{allPeriods[key as keyof typeof allPeriods]}</button>
            ))}
            </div>
        </div>
      </div>
      <SummaryCard activities={activities} />
      </>
    )
}