
import Header from "../components/Header";
import Stats from "../components/strava/Stats";
import WeekSummary from "../components/strava/WeekSummary";
import Weekly from "../components/strava/Weekly";
import Monthly from "../components/strava/Monthly";
import Activity from "../components/strava/Activity";

export default async function Dashboard() {


  return (
    <>
      <Header />
        <article className="dashboard">
          <section className="dashboard-item">
              <WeekSummary />
          </section>
          <section className="dashboard-item">
            <Weekly />
          </section>
          <section className="dashboard-item">
          <Monthly /> 
          </section>
          <section className="dashboard-item">
          <Activity />
          </section>
          <Stats />
        </article>
    </>
  );
}
