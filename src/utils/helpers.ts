export const getYYYYMMDDFromDate = (
  date: Date | string,
  separator: "point" | "dash" = "dash"
): string => {
  if (!date) return "";

  const newDate = new Date(date);

  const month = newDate.getMonth();
  const monthString = String(month + 1 < 10 ? `0${month + 1}` : month + 1);
  const day = newDate.getDate();
  const dayString = String(day < 10 ? `0${day}` : day);
  const yearString = String(newDate.getFullYear());

  if (separator === "point")
    return [dayString, monthString, yearString].join(".");

  return [yearString, monthString, dayString].join("-");
};

export const getHHIIFromDate = (date: Date | string): string => {
  if (!date) return "";

  const newDate = new Date(date);

  const hours = newDate.getHours();
  const hoursString = String(hours < 10 ? `0${hours}` : hours);
  const minutes = newDate.getMinutes();
  const minutesString = String(minutes < 10 ? `0${minutes}` : minutes);

  return [hoursString, minutesString].join(":");
};

export const parseDate = (date: Date): string =>
  `${getYYYYMMDDFromDate(date)} ${getHHIIFromDate(date)}`;
