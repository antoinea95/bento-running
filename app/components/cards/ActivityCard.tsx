import dynamic from "next/dynamic";
import { StravaActivitieType } from "../../types/schema";
import {
  convertSecondsInTime,
  convertSpeed,
  formaterDate,
} from "../../utils/helpers";
import {
  Footprints,
  Gauge,
  Heart,
  Hourglass,
  Mountain,
  Route,
} from "lucide-react";

const MyAwesomeMap = dynamic(() => import("../map/Map"), { 
  ssr: false ,
  loading: () => (<div className="activity-card_map_placeholder"><Footprints className="placeholder-icon" /></div>)
});

export default function ActivityCard({
  activity,
}: {
  activity: StravaActivitieType;
}) {

  return (
    <div className="activity-card">
      <div className="activity-card_map">
        {activity.map.summary_polyline !== "" ? (
          <MyAwesomeMap sumPolyline={activity.map.summary_polyline} />
        ) : (
          <div className="activity-card_map_placeholder">
            <Footprints className="placeholder-icon" />
          </div>
        )}
      </div>
      <div className="activity-card_body">
        <div className="activity-card_body_title">
          <h3>{activity.name}</h3>
          <p>{formaterDate(activity.start_date_local)}</p>
        </div>
        <div className="activity-card_body_content">
          <div className="activity-card_body_content_item">
            <p>
              <Route className="activity-card_icon" />
            </p>
            <p>{(activity.distance / 1000).toFixed(2)} km</p>
          </div>
          <div className="activity-card_body_content_item">
            <p>
              <Hourglass className="activity-card_icon" />
            </p>
            <p>{convertSecondsInTime(activity.moving_time)}</p>
          </div>
          <div className="activity-card_body_content_item">
            <p>
              <Gauge className="activity-card_icon" />
            </p>
            <p>{convertSpeed(activity.average_speed)}</p>
          </div>
          <div className="activity-card_body_content_item">
            <p>
              <Heart className="activity-card_icon heart" />
            </p>
            {activity.has_heartrate ? (
              <p>{activity.average_heartrate?.toFixed(0)} bpm</p>
            ) : (
              <p>__</p>
            )}
          </div>
          <div className="activity-card_body_content_item">
            <p>
              <Mountain className="activity-card_icon" />
            </p>
            <p>{activity.total_elevation_gain} m</p>
          </div>
          {activity.average_cadence ? (
            <div className="activity-card_body_content_item">
              <p>
                {" "}
                <Footprints className="activity-card_icon" />
              </p>
              <p>{Math.round(activity.average_cadence * 2)}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
