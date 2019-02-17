import { promisify } from 'util';
import { randomBytes } from 'crypto';

const randomBytesAsync = promisify(randomBytes);

export default async function createUserID() {
  const buffer = await randomBytesAsync(16);

  return `dl_${ buffer.toString('hex') }`;
}
