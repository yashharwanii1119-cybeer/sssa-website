import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> = Request<P, ResBody, ReqBody, ReqQuery>;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ message: 'Authentication misconfigured: missing JWT_SECRET' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }
    req.user = decoded as { id: string; email: string; role: string };
    next();
  });
};
