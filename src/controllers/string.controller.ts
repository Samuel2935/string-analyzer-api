import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/string.service.js';

export const createString = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { value } = req.body;
    if (!value) return res.status(400).json({ error: 'Missing "value"' });

    const result = service.createString(value);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const getStringByIdOrValue = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_or_value } = req.params;
    if (!id_or_value) return res.status(400).json({ error: 'Missing "id_or_value"' });

    const result = service.getStringByIdOrValue(id_or_value);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const getAllStrings = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = service.getAllStrings(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const filterByNaturalLanguage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.query as string;
    const result = service.filterByNaturalLanguage(query);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const deleteString = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_or_value } = req.params;
    if (!id_or_value) return res.status(400).json({ error: 'Missing "id_or_value"' });

    const result = service.deleteString(id_or_value);
    res.status(result.status).json(result.body || {});
  } catch (err) {
    next(err);
  }
};
