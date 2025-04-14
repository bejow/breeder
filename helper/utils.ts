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

export {removeItemOnce, scaleNumber}
