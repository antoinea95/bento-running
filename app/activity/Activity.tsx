import { fetchAllActivities } from "../lib/strava";
import dynamic from "next/dynamic";
import { activitiesMocked, convertSecondsInTime, convertSpeed, formaterDate } from "../utils/helpers";
import { Gauge, Heart, Hourglass, Mountain, Route } from "lucide-react";

const MyAwesomeMap = dynamic(() => import("../components/Map"), { ssr:false })


export default async function Activity() {

    const activities = activitiesMocked;
    

    return (
        <div className="activity">
            {activities.map((activity) => (
                <div className="activity-container" key={activity.id}>
                    <div className="activity-map">
                        <MyAwesomeMap sumPolyline={activity.map.summary_polyline}/>
                    </div>
                    <div className="activity-body">
                        <div className="activity-body_title">
                            <h3>{activity.name}</h3>
                            <p>{formaterDate(activity.start_date_local)}</p>
                        </div>
                        <div className="activity-body_content">
                            <div className="activity-body_content-item">
                                <h4> <Route size={16} style={{marginRight: "0.5rem"}} /> Distance </h4>
                                <p>{(activity.distance / 1000).toFixed(2)} KM</p>
                            </div>
                            <div className="activity-body_content-item">
                                <h4> <Hourglass size={16} style={{marginRight: "0.5rem"}} /> Time </h4>
                                <p>{convertSecondsInTime(activity.moving_time)}</p>
                            </div>
                            <div className="activity-body_content-item">
                                <h4> <Gauge size={16} style={{marginRight: "0.5rem"}} />speed </h4>
                                <p>{convertSpeed(activity.average_speed)}</p>
                            </div>
                            <div className="activity-body_content-item">
                                <h4> <Heart size={16} fill="red" strokeOpacity={0} style={{marginRight: "0.5rem"}} />heart </h4>
                                {activity.has_heartrate ? 
                                <p>{activity.average_heartrate.toFixed(0)} BPM</p> :
                                <p>__</p>
                                }
                            </div>
                            <div className="activity-body_content-item">
                                <h4> <Mountain size={16} style={{marginRight: "0.5rem"}}/> D+</h4>
                                <p>{activity.total_elevation_gain} m</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}