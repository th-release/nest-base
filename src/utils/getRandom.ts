function getCharacters(
  type:
    'numeric' | 'lowercase' | 'uppercase' | 'all' | 'alphanumeric'
): string {
  switch (type) {
    case 'numeric':
      return '0123456789';
    case 'lowercase':
      return 'abcdefghijklmnopqrstuvwxyz';
    case 'uppercase':
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    case 'all':
    case 'alphanumeric':
      return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export default function getRandom(
  type: 'numeric' | 'lowercase' | 'uppercase' | 'all' | 'alphanumeric',
  length: number
): string {
  let result = '';
  const characters = getCharacters(type);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}