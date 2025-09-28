import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { hash, compare } from '../utils/hash';
import { signJwt } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { email, password, name, locale } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'Email already in use' });
  const passwordHash = await hash(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name, locale }
  });
  const token = signJwt({ sub: user.id });
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, locale: user.locale } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signJwt({ sub: user.id });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, locale: user.locale } });
}

export async function me(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ id: user.id, email: user.email, name: user.name, locale: user.locale, createdAt: user.createdAt });
}
