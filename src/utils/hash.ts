import bcrypt from 'bcryptjs';

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function compare(password: string, hashValue: string) {
  return bcrypt.compare(password, hashValue);
}
