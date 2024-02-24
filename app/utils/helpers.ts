import { StravaActivitieType, StravaActivitiesType, StravaTotal } from "../types/schema";



export function formaterDate(dateStr:string) : string {
  const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', // jour de la semaine
      day: 'numeric', // date
      month: 'long', // mois
      year: 'numeric', // année
      hour: 'numeric', // heure
      minute: 'numeric', // minute
      hour12: false // format 24 heures
  };

  const date = new Date(dateStr);
  options.timeZone = 'UTC';
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
};

export function convertSecondsInTime(secondes: number): string {
  const heures = Math.floor(secondes / 3600);
  const minutes = Math.floor((secondes % 3600) / 60);
  const secondesRestantes = secondes % 60;

  let temps = '';
  if (heures > 0) {
      temps += `${heures}:`;
  }
  temps += `${minutes < 10 ? '0' + minutes : minutes}:${secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes}`;

  return temps;
};


export function convertSpeed(speed: number) : string {

    let vitesseKmmin = 1000 / speed;
    let minutes = Math.floor(vitesseKmmin / 60);
    let secondes = Math.round(vitesseKmmin % 60);

    return `${minutes}:${secondes < 10 ? '0' + secondes : secondes}/km`;
};

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff)); // Affectez la nouvelle date
};

export function getEpochTime(today: Date): {
  previousWeekEpoch: number;
  previousLastFoursWeeksEpoch: number;
  previousMonthEpoch: number;
  januaryFirstEpoch: number;
} {
  const previousWeek = getStartOfWeek(today);
  previousWeek.setHours(0, 0, 0);
  const previousWeekEpoch = Math.round(previousWeek.getTime() / 1000);

  const previousLastFourWeeks = getStartOfWeek(today);
  previousLastFourWeeks.setDate(previousLastFourWeeks.getDate() - 21);
  const previousLastFoursWeeksEpoch = Math.round(previousLastFourWeeks.getTime() / 1000);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  firstDayOfMonth.setHours(0, 0, 0); // Set hours to beginning of the day
  const previousMonthEpoch = Math.round(firstDayOfMonth.getTime() / 1000);

  const januaryFirst = new Date(today.getFullYear(), 0, 1);
  const januaryFirstEpoch = Math.round(januaryFirst.getTime() / 1000);

  return { previousWeekEpoch, previousLastFoursWeeksEpoch, previousMonthEpoch , januaryFirstEpoch};
};

export function calculateMonthlyTotalRuns(activities: StravaActivitiesType) : StravaTotal[] {

  const monthlyDistance: Record<string, number> = {};

  activities.forEach((activity) => {
    const {distance, start_date_local} = activity
    const startDate = new Date(start_date_local);
    const monthNames = [
      "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
      "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
    ];

    const month = startDate.getMonth();
    const monthKey = `${monthNames[month]}`;

    if(monthlyDistance[monthKey]) {
      monthlyDistance[monthKey] += Number((distance / 1000).toFixed(2));
    } else {
      monthlyDistance[monthKey] = Number((distance / 1000).toFixed(2));
    }
  });

  const monthlyTotalRuns = Object.keys(monthlyDistance).map((key) => {
    return {
      date: key,
      kilometers: Number((monthlyDistance[key]).toFixed(2)),
    };
  });

  return monthlyTotalRuns;
};

export function calculateWeeklyTotalRuns(
  activities: StravaActivitiesType
): StravaTotal[] {
  const weeklyDistance: Record<string, number> = {};
  
  activities.forEach((activity) => {

    const startDate = getStartOfWeek(new Date(activity.start_date_local));

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const weekStartDate = `${startDate.getDate()} ${
      endDate.getMonth() !== startDate.getMonth()
        ? startDate.toLocaleString("default", { month: "short" }) + "."
        : ""
    }`;
    
    const weekEndDate = `${endDate.getDate()} ${endDate.toLocaleString(
      "default",
      { month: "short" }
    )}.`;

    const weekKey = `${weekStartDate} - ${weekEndDate}`;

    if (weeklyDistance[weekKey]) {
      weeklyDistance[weekKey] += Number((activity.distance / 1000).toFixed(2));
    } else {
      weeklyDistance[weekKey] = Number((activity.distance / 1000).toFixed(2));
    }
  });

  const weeklyTotalRuns = Object.keys(weeklyDistance).map((key) => {
    return {
      date: key,
      kilometers: Number(weeklyDistance[key].toFixed(2)),
    };
});


return weeklyTotalRuns;


};

export const getSummary = (activities: StravaActivitiesType) => {

  if(activities.length === 0) {
    return {
        activities: 0,
        distance: "0 km",
        time: "--",
        elevation: "0 m",
        speed: "--:-- /km", 
        heartrate: "-- bpm"
    }
  };

  let totalKilometers = 0;
  let totalSeconds = 0;
  let totalElevation = 0;
  let totalSpeed = 0;
  let totalHR = 0;

  activities.forEach((activity: StravaActivitieType) => {
    totalKilometers+=Number((activity.distance / 1000));
    totalSeconds+=activity.moving_time;
    totalElevation+=Number(activity.total_elevation_gain);
    totalSpeed+=activity.average_speed;
    if(activity.average_heartrate) totalHR+= activity.average_heartrate
  })

  const totalTime = convertSecondsInTime(totalSeconds);
  const averageSpeed = convertSpeed((totalSpeed / activities.length));
  const averageHR = Math.round(totalHR / activities.length);

  return {
    activities: activities.length,
    distance: `${Math.round(totalKilometers)} km`,
    time: totalTime,
    elevation: `${Math.round(totalElevation)} m`,
    speed: averageSpeed, 
    heartrate: `${averageHR > 0 ? averageHR : "--"} bpm`
  }
};