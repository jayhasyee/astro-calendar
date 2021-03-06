import moment from 'moment';
import calcBands from './calcBands';

export default (timestamp, weekOffset = 0, location) => {
  const date = moment(timestamp);
  const startOfMonth = moment(date).startOf('month');

  let diff = startOfMonth.weekday() - weekOffset;
  if (diff < 0) diff += 7;

  const prevMonthDays = [];
  for (let i = 0; i < diff; i++) {
    prevMonthDays.push({
      day: startOfMonth
        .clone()
        .subtract(diff - i, 'days')
        .valueOf(),
      classNames: 'prevMonth'
    });
  }

  const currentMonthDays = [];
  for (let i = 1; i < date.daysInMonth() + 1; i++) {
    currentMonthDays.push({
      day: moment([date.year(), date.month(), i]).valueOf()
    });
  }

  const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

  const nextMonthDays = [];
  let i = 1;
  while ((daysAdded + i) % 7 !== 0) {
    nextMonthDays.push({
      day: moment(currentMonthDays[currentMonthDays.length - 1].day)
        .clone()
        .add(i, 'days')
        .valueOf(),
      classNames: 'nextMonth'
    });

    i = i + 1;
  }

  return calcBands([...prevMonthDays, ...currentMonthDays, ...nextMonthDays], location);
};
