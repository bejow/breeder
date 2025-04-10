function removeItemOnce<Type>(arr: Type[], value: Type): Type[] {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

export {removeItemOnce}