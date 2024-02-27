"use client"


import { fetchAllActivities, fetchStravaActivities } from "@/app/lib/strava";
import { StravaActivitiesType } from "@/app/types/schema";
import { getEpochTime } from "@/app/utils/helpers";
import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import SummaryCard from "../cards/SummaryCard";
import { mockedActivities } from "@/app/utils/mock";

export default function Summary({mocked} : {mocked?: true}) {

    const allPeriods = {
        "week": "This week",
        "month": "This month",
        "year": "This year",
    }

    const {previousWeekEpoch, previousMonthEpoch} = getEpochTime(new Date());
    const [period, setPeriod] = useState("week")
    const [showOptions, setShowOptions] = useState(false);
    const [activities, setActivities] = useState<StravaActivitiesType>([]);

    const getActivitiesByPeriod = async () => {
        let activities: StravaActivitiesType = [];
    
        const fetchActivities = async (endpoint: string, params: any) => {
            if (mocked) {
                return mockedActivities.filter(activity => {
                    const startDate = new Date(activity.start_date_local);
                    if (period === "week") {
                        const previousWeek = new Date();
                        previousWeek.setDate(previousWeek.getDate() - 7);
                        return startDate >= previousWeek;
                    } else if (period === "month") {
                        const previousMonth = new Date();
                        previousMonth.setMonth(previousMonth.getMonth() - 1);
                        return startDate >= previousMonth;
                    }
                    return true; // Return true for other periods or no period specified
                });
            } else {
                return await fetchStravaActivities(endpoint, params);
            }
        };
    
        if (period === "week") {
            activities = await fetchActivities('athlete/activities', { page: 1, per_page: 200, after: previousWeekEpoch });
        } else if (period === "month") {
            activities = await fetchActivities('athlete/activities', { page: 1, per_page: 200, after: previousMonthEpoch });
        } else if (period === "year") {
            if (mocked) {
                activities = mockedActivities.filter(activity => {
                    const startDate = new Date(activity.start_date_local);
                    const previousYear = new Date();
                    previousYear.setFullYear(previousYear.getFullYear() - 1);
                    return startDate >= previousYear;
                });
            } else {
                activities = await fetchAllActivities();
            }
        }
    
        setActivities(activities);
    };

    useEffect(() => {
        getActivitiesByPeriod();
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
                    <ChevronDown style={{padding: 0}} color="#fc4c01"/>
                </button>
            </h2>
            <div className={` summary-select_options ${showOptions ? "summary-select_options_open" : ""}`}>
            {Object.keys(allPeriods).map((key) => (
                key!== period && <button key={key} onClick={() => {setPeriod(key); setShowOptions(false)}} className="summary-select_btn"><span>{allPeriods[key as keyof typeof allPeriods]}</span></button>
            ))}
            </div>
        </div>
      </div>
      <SummaryCard activities={activities} />
      </>
    )
}