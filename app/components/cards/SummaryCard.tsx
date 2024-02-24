import { StravaActivitiesType } from "@/app/types/schema"
import { getSummary } from "@/app/utils/helpers"

export default function SummaryCard({activities} : {activities: StravaActivitiesType}) {

    const weekSummary = getSummary(activities)

    return (
            <div className="summary">
                {Object.keys(weekSummary).map((key) => (
                    <div className="summary-item" key={key}>
                        <h3>{key}</h3>
                        <p>{weekSummary[key as keyof typeof weekSummary]}</p>
                    </div>
                ))}
            </div>
    )


}