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

const MyAwesomeMap = dynamic(() => import("../map/Map"), { ssr: false });

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
            <h4>
              <Route className="activity-card_icon" />
            </h4>
            <p>{(activity.distance / 1000).toFixed(2)} km</p>
          </div>
          <div className="activity-card_body_content_item">
            <h4>
              <Hourglass className="activity-card_icon" />
            </h4>
            <p>{convertSecondsInTime(activity.moving_time)}</p>
          </div>
          <div className="activity-card_body_content_item">
            <h4>
              <Gauge className="activity-card_icon" />
            </h4>
            <p>{convertSpeed(activity.average_speed)}</p>
          </div>
          <div className="activity-card_body_content_item">
            <h4>
              <Heart className="activity-card_icon heart" />
            </h4>
            {activity.has_heartrate ? (
              <p>{activity.average_heartrate?.toFixed(0)} bpm</p>
            ) : (
              <p>__</p>
            )}
          </div>
          <div className="activity-card_body_content_item">
            <h4>
              <Mountain className="activity-card_icon" />
            </h4>
            <p>{activity.total_elevation_gain} m</p>
          </div>
          {activity.average_cadence ? (
            <div className="activity-card_body_content_item">
              <h4>
                {" "}
                <Footprints className="activity-card_icon" /> Cadence
              </h4>
              <p>{activity.average_cadence}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
