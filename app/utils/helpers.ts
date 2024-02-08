import { StravaActivitieType, StravaActivitiesType, StravaWeeklyTotal } from "../types/schema";

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

export function getPreviousWeekAndMonthDates(today: Date): {
  previousWeekEpoch: number;
  previousMonthEpoch: number;
} {
  // Date de la semaine précédente
  const previousWeek = getStartOfWeek(today);
  const previousWeekEpoch = Math.round(previousWeek.getTime() / 1000);

  // Date du mois précédent
  const previousMonth = new Date(today);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  const previousMonthEpoch = Math.round(previousMonth.getTime() / 1000);

  return { previousWeekEpoch, previousMonthEpoch };
}

export function calculateAllTimesHistory(activities: StravaActivitiesType) {
  

}

export function calculateWeeklyTotalRuns(
  activities: StravaActivitiesType
): StravaWeeklyTotal[] {
  const rawWeeklyTotalRuns = new Map<string, number>();

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

    if (!rawWeeklyTotalRuns.has(weekKey)) {
      rawWeeklyTotalRuns.set(weekKey, 0);
    }
    rawWeeklyTotalRuns.set(
      weekKey,
      rawWeeklyTotalRuns.get(weekKey)! + activity.distance / 1000
    );
  });

  const weeklyTotalRuns = Array.from(rawWeeklyTotalRuns, ([key, value]) => {
    return {
      week: key,
      kilometers: Math.round(value),
    };
  });

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
