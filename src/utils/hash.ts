import { SHA3 } from 'sha3'

export default function hash(input: string) {
  const encrypt = new SHA3(512);

  encrypt.update(input);
  return encrypt.digest({ buffer: Buffer.alloc(2048), format: 'hex' });
}