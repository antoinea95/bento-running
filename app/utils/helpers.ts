import { StravaActivitiesType } from "../types/schema";

export function getPreviousWeekAndMonthDates(today: Date): { previousWeekEpoch: number; previousMonthEpoch: number } {
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

export function calculateWeeklyTotalRuns(activities: StravaActivitiesType): Map<string, number> {
    const weeklyTotalRuns = new Map<string, number>();

    activities.forEach(activity => {
        const weekStartDate = getStartOfWeek(new Date(activity.start_date_local))


        const weekEndDate = new Date(weekStartDate);
        weekEndDate.setDate(weekEndDate.getDate() + 7); // Dimanche de la semaine

        const weekKey = `${weekStartDate.toISOString().slice(0, 10)}-${weekEndDate.toISOString().slice(0, 10)}`;
        
        if (!weeklyTotalRuns.has(weekKey)) {
            weeklyTotalRuns.set(weekKey, 0);
        }
        weeklyTotalRuns.set(weekKey, weeklyTotalRuns.get(weekKey)! + (activity.distance / 1000));
    });

    return weeklyTotalRuns;
}