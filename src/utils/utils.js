export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const sortWeekDays = (date) => {
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  console.log(day);
  return [...weekDays.slice(day - 1), ...weekDays.slice(0, day - 1)];
};

export const splitToWeeks = (monthDays) => {
  let arrays = [];
  const size = 7;

  for (let i = 0; i < monthDays.length; i += size) {
    if (monthDays.slice(i, i + size).length < size) {
      const slicedArray = monthDays.slice(i, i + size);
      const leftSpace = size - slicedArray.length;
      const newArray = slicedArray.concat(Array(leftSpace).fill(""));
      arrays.push(newArray);
    } else {
      arrays.push(monthDays.slice(i, i + size));
    }
  }
  return arrays;
};
