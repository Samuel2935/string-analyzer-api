import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
}
