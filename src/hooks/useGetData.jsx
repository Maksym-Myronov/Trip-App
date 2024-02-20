export const useGetData = () => {
    const WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayInAWeekFull = new Date().getDay();
    const currentDayFull = WEEK[dayInAWeekFull];
    // const currentDayOfMonthFull = new Date().getDate();
    const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"]
    const dayInAWeek = new Date().getDay()
    const currentDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))

    return [currentDay, currentDayFull]
}