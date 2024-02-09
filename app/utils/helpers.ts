import { StravaActivitieType, StravaActivitiesType, StravaTotal } from "../types/schema";

function convertSecondsInTime(secondes: number): string {
  const heures = Math.floor(secondes / 3600);
  const minutes = Math.floor((secondes % 3600) / 60);
  const secondesRestantes = secondes % 60;

  let temps = '';
  if (heures > 0) {
      temps += `${heures}h`;
  }
  temps += `${minutes < 10 ? '0' + minutes : minutes}mn${secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes}s`;

  return temps;
}

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff)); // Affectez la nouvelle date
}

export function getEpochTime(today: Date): {
  previousWeekEpoch: number;
  previousMonthEpoch: number;
  januaryFirstEpoch: number;
} {
  // Date de la semaine précédente
  const previousWeek = getStartOfWeek(today);
  const previousWeekEpoch = Math.round(previousWeek.getTime() / 1000);

  // Date du mois précédent
  const previousMonth = getStartOfWeek(today);
  previousMonth.setDate(previousMonth.getDate() - 21);
  const previousMonthEpoch = Math.round(previousMonth.getTime() / 1000);

  // Date du 1er janvier de l'année en cours
  const januaryFirst = new Date(today.getFullYear(), 0, 1);
  const januaryFirstEpoch = Math.round(januaryFirst.getTime() / 1000);


  return { previousWeekEpoch, previousMonthEpoch , januaryFirstEpoch};
}

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
      monthlyDistance[monthKey] += Math.round(distance / 1000);
    } else {
      monthlyDistance[monthKey] = Math.round(distance / 1000);
    }
  })

  const monthlyTotalRuns = Object.keys(monthlyDistance).map((key) => {
    return {
      date: key,
      kilometers: Math.round(monthlyDistance[key]),
    };
})


return monthlyTotalRuns;

}

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
      weeklyDistance[weekKey] += Math.round(activity.distance / 1000);
    } else {
      weeklyDistance[weekKey] = Math.round(activity.distance / 1000);
    }
  });

  const weeklyTotalRuns = Object.keys(weeklyDistance).map((key) => {
    return {
      date: key,
      kilometers: Math.round(weeklyDistance[key]),
    };
})


return weeklyTotalRuns;


}

export const getWeekSummary = (activities: StravaActivitiesType) => {

  let totalKilometers = 0;
  let totalSeconds = 0;
  let totalElevation = 0;

  activities.forEach((activity: StravaActivitieType) => {
    totalKilometers+=Math.round(activity.distance/1000);
    totalSeconds+=activity.moving_time;
    totalElevation+=Math.round(activity.total_elevation_gain);
  })

  const totalTime = convertSecondsInTime(totalSeconds)

  return {
    distance: `${totalKilometers}km`,
    time: totalTime,
    elevation: `${totalElevation}m`
  }

}

export const getTotalMonth = (activies: StravaActivitiesType) => {

}
