const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateNameAndColor(name: string) {
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(-1).join('');
  const concatName = firstName[0] + ' ' + lastName[0]

  return {
    name: concatName,
    color: generateRandomColor()
  }
}