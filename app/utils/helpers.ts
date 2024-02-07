import { StravaActivitiesType, StravaWeeklyTotal } from "../types/schema";

export function getPreviousWeekAndMonthDates(today: Date): {
  previousWeekEpoch: number;
  previousMonthEpoch: number;
} {
  // Date de la semaine précédente
  const previousWeek = new Date(today);
  previousWeek.setDate(previousWeek.getDate() - 7);
  const previousWeekEpoch = Math.round(previousWeek.getTime() / 1000);

  // Date du mois précédent
  const previousMonth = new Date(today);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  const previousMonthEpoch = Math.round(previousMonth.getTime() / 1000);

  return { previousWeekEpoch, previousMonthEpoch };
}

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff)); // Affectez la nouvelle date
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
