import moment from "moment";

function removeItemOnce<Type>(arr: Type[], value: Type): Type[] {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }


const scaleNumber = (value:number, minOriginalValue:number, maxOriginalValue:number, minTargetValue:number, maxTargetValue:number) => {
  // scales numbers in a given range
  // 2, 0-10, 0-1 ==> 0.2
  let scaledNumber = (value - minOriginalValue) * ((maxTargetValue - minTargetValue)/(maxOriginalValue - minOriginalValue)) + minTargetValue
  return scaledNumber
} 

const humanizeDuration = (targetDate: Date, referenceDate = moment()) =>{
  const start = moment.min(moment(targetDate), moment(referenceDate)).clone();
  const end = moment.max(moment(targetDate), moment(referenceDate)).clone();
  const isFuture = moment(targetDate).isAfter(referenceDate);

  const years = end.diff(start, 'years');
  start.add(years, 'years');

  const months = end.diff(start, 'months');
  start.add(months, 'months');

  const days = end.diff(start, 'days');

  let parts = [];
  if (years) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
  if (months) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  if (days || parts.length === 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

  const direction = isFuture ? 'until' : 'ago';
  return `${ isFuture ? 'in' : ''} ${parts.join(', ')} ${ isFuture ? '' : 'ago'}`;
}

const createDateDurationString = (date?: Date) => {
  if (!date){
    return ""
  }

  let duration = humanizeDuration(date)
  let dateString = date.toLocaleDateString(["de", "en-us"])

  return `${dateString} | ${duration}`
}

export {removeItemOnce, scaleNumber, createDateDurationString, humanizeDuration}
