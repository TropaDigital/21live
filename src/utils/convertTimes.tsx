function multiplyTime(time: string, multiplier: number): string {
  // Converte o valor de tempo para segundos
  const [hours, minutes, seconds] = time.split(':').map((part) => parseInt(part));
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Realiza a multiplicação
  const multipliedSeconds = totalSeconds * multiplier;

  // Converte o resultado para o formato de tempo
  const multipliedHours = Math.floor(multipliedSeconds / 3600);
  const multipliedMinutes = Math.floor((multipliedSeconds - multipliedHours * 3600) / 60);
  const multipliedSecondsLeft = multipliedSeconds - multipliedHours * 3600 - multipliedMinutes * 60;
  const multipliedTime = `${multipliedHours.toString().padStart(2, '0')}:${multipliedMinutes
    .toString()
    .padStart(2, '0')}:${multipliedSecondsLeft.toString().padStart(2, '0')}`;

  return multipliedTime;
}

function sumTimes(times: string[]): string {
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
}

export { multiplyTime, sumTimes };
