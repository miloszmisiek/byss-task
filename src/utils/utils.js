export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
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
  return [...weekDays.slice(day - 1), ...weekDays.slice(0, day - 1)];
};

export const splitToWeeks = (now, monthDays) => {
  const day = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  let arrays = [];
  const size = 7;

  const updatedDays =
    day > 0
      ? Array(day - 1)
          .fill('')
          .concat(monthDays)
      : monthDays;

  for (let i = 0; i < updatedDays.length; i += size) {
    if (updatedDays.slice(i, i + size).length < size) {
      const slicedArray = updatedDays.slice(i, i + size);
      const leftSpace = size - slicedArray.length;
      const newArray = slicedArray.concat(Array(leftSpace).fill(''));
      arrays.push(newArray);
    } else {
      arrays.push(updatedDays.slice(i, i + size));
    }
  }
  return arrays;
};
