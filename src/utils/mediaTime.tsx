function averageTime(hours: any, totalItems: any) {
  const totalHours = hours.reduce(
    (total: any, currentValue: any) => (total = total + currentValue.minutes),
    0
  );
  const totalDivider = totalItems;

  const average = totalHours / totalDivider;

  return average.toFixed();
}

export { averageTime };
