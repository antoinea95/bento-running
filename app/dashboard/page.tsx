import Header from "../components/layout/Header";
import Stats from "../components/layout/Stats";
import Summary from "../components/layout/Summary";
import Weekly from "../components/layout/Weekly";
import Monthly from "../components/layout/Monthly";
import Activity from "../components/layout/Activity";
import LastActivity from "../components/layout/LastActivity";
import {
  Calendar,
  Flame,
  HandshakeIcon,
  LineChart,
  Medal,
  Trophy,
} from "lucide-react";
import { Suspense } from "react";
import DashboardSkeleton from "../components/layout/DashboardSkeleton";

export default async function Dashboard() {
  return (
    <>
      <Header />
      <Suspense fallback={<DashboardSkeleton />}>
        <article className="dashboard">
          <section className="dashboard-item">
            <Summary />
          </section>
          <section className="dashboard-item">
            <h2 className="dashboard-item_title">
              <div className="icon-container">
                <HandshakeIcon className="icon" />
              </div>
              Last activity
            </h2>
            <LastActivity />
          </section>
          <section className="dashboard-item">
            <h2 className="dashboard-item_title">
              <div className="icon-container">
                <LineChart className="icon" />
              </div>
              Trend
            </h2>
            <Weekly />
          </section>
          <section className="dashboard-item">
            <h2 className="dashboard-item_title">
              <div className="icon-container">
                <Flame className="icon" />
              </div>
              Activities
            </h2>
            <Activity />
            <div className="activity-fade"></div>
          </section>
          <section className="dashboard-item">
            <h2 className="dashboard-item_title">
              <div className="icon-container">
                <Medal className="icon" />
              </div>
              This year
            </h2>
            <Monthly />
          </section>
          <section className="dashboard-item">
            <h2 className="dashboard-item_title">
              <div className="icon-container">
                <Trophy className="icon" />
              </div>
              All times
            </h2>
            <Stats />
          </section>
        </article>
      </Suspense>
    </>
  );
}
