function getCharacters(type: string) {
  switch (type.toLowerCase()) {
    case 'numeric':
    case 'number':
      return '0123456789';
    case 'lowercase':
      return 'abcdefghijklmnopqrstuvwxyz';
    case 'uppercase':
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    case 'alphanumeric':
    case 'all':
      return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export default function getRandom(type: string, length: number) {
  let result = '';
  const characters = getCharacters(type);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
