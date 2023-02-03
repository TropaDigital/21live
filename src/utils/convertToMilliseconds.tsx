export function convertToMilliseconds(hour: any) {
  const separatorHours = hour.split(':')
  const milliseconds = (separatorHours[0] * 3600 + separatorHours[1] * 60 + separatorHours[2]) * 1000

  return milliseconds
}