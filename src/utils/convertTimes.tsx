function multiplyTime(time: string, multiplier: number): string {
  if (time && multiplier) {
    // Converte o valor de tempo para segundos
    const [hours, minutes, seconds] = time.split(':').map((part) => parseInt(part));
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Realiza a multiplicação
    const multipliedSeconds = totalSeconds * multiplier;

    // Converte o resultado para o formato de tempo
    const multipliedHours = Math.floor(multipliedSeconds / 3600);
    const multipliedMinutes = Math.floor((multipliedSeconds - multipliedHours * 3600) / 60);
    const multipliedSecondsLeft =
      multipliedSeconds - multipliedHours * 3600 - multipliedMinutes * 60;
    const multipliedTime = `${multipliedHours.toString().padStart(2, '0')}:${multipliedMinutes
      .toString()
      .padStart(2, '0')}:${multipliedSecondsLeft.toString().padStart(2, '0')}`;

    return multipliedTime;
  } else {
    return '00:00:00';
  }
}

function sumTimes(times: string[]): string {
  if (times) {
    const totalSeconds = times.reduce((acc, curr) => {
      const [hours, minutes, seconds] = curr.split(':').map(Number);
      return acc + hours * 3600 + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  } else {
    return '00:00:00';
  }
}

function subtractTime(timePassed: string, timeToSubtract: string): string {
  const timePassedArray: number[] = timePassed.split(':').map(Number);
  const timeToSubtractArray: number[] = timeToSubtract.split(':').map(Number);

  const passedSeconds: number =
    timePassedArray[0] * 3600 + timePassedArray[1] * 60 + timePassedArray[2];
  const subtractSeconds: number =
    timeToSubtractArray[0] * 3600 + timeToSubtractArray[1] * 60 + timeToSubtractArray[2];

  const remainingSeconds: number = passedSeconds - subtractSeconds;

  const isNegative: boolean = remainingSeconds < 0;
  const absoluteSeconds: number = Math.abs(remainingSeconds);

  const hours: number = Math.floor(absoluteSeconds / 3600);
  const minutes: number = Math.floor((absoluteSeconds % 3600) / 60);
  const seconds: number = absoluteSeconds % 60;

  const formattedTime = `${isNegative ? '-' : ''}${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedTime;
}

function isTimeConsumedMoreThanPercent(timePassed: string, total_time: string): string {
  const timePassedArray: number[] = timePassed?.split(':').map(Number);
  const total_timeArray: number[] = total_time?.split(':').map(Number);

  const passedSeconds: number =
    timePassedArray[0] * 3600 + timePassedArray[1] * 60 + timePassedArray[2];
  const totalSeconds: number =
    total_timeArray[0] * 3600 + total_timeArray[1] * 60 + total_timeArray[2];

  const consumedPercentage: number = (passedSeconds / totalSeconds) * 100;
  if (consumedPercentage > 50) {
    return 'more than 50%';
  } else if (consumedPercentage > 30) {
    return 'more than 30%';
  } else {
    return 'it OK';
  }
}

export { multiplyTime, sumTimes, subtractTime, isTimeConsumedMoreThanPercent };
