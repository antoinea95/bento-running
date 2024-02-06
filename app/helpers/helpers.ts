
export function getPreviousWeekAndMonthDates(today: Date): { previousWeek: Date; previousMonth: Date } {
    // Date de la semaine précédente
    const previousWeek = new Date(today);
    previousWeek.setDate(previousWeek.getDate() - 7);

    // Date du mois précédent
    const previousMonth = new Date(today);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    return { previousWeek, previousMonth };
}