function sumHours(hours: any) {
  if (hours.length > 0) {
    const totalHours = hours.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue.minutes;
    }, 0);

    return totalHours;
  }
}

export { sumHours };
