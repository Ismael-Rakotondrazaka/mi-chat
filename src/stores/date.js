import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDateStore = defineStore("date", () => {
  const now = ref(new Date());

  const intervalId = ref(-1);

  const isToday = computed(
    () => (date) => date.toDateString() === now.value.toDateString()
  );

  const getYearAndWeek = (date) => {
    // Copy date so don't modify original
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  };
  const isOnThisWeek = computed(() => (date) => {
    let [year, week] = getYearAndWeek(now.value);
    const [yearToCompare, weekToCompare] = getYearAndWeek(date);

    return year === yearToCompare && week === weekToCompare;
  });

  const isOnThisYear = computed(
    () => (date) => date.getFullYear() === now.value.getFullYear()
  );

  intervalId.value = setInterval(() => {
    now.value = new Date();
  }, 60000);

  const resetStore = () => {};

  return {
    now,
    isToday,
    isOnThisWeek,
    isOnThisYear,
    resetStore,
  };
});
