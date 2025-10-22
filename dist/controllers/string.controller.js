import * as service from '../services/string.service.js';
import crypto from 'crypto';
import { randomUUID } from 'crypto';
// In-memory store
const store = new Map();
export const createString = (req, res) => {
    const { value } = req.body;
    if (!value)
        return res.status(400).json({ error: 'Missing "value" field' });
    const normalized = value.trim();
    const key = normalized.toLowerCase();
    //  Check for duplicate
    if (store.has(key)) {
        return res.status(409).json({ error: 'String already exists' });
    }
    const is_palindrome = normalized.toLowerCase() ===
        normalized.toLowerCase().split('').reverse().join('');
    const sha256_hash = crypto.createHash('sha256').update(normalized).digest('hex');
    const newString = {
        id: randomUUID(), // ✅ Add ID
        value: normalized,
        properties: { is_palindrome, sha256_hash },
    };
    store.set(key, newString);
    return res.status(201).json(newString);
};
export const getAllStrings = (req, res) => {
    const all = Array.from(store.values());
    return res.status(200).json({ data: all });
};
export const getStringByIdOrValue = (req, res) => {
    const { id_or_value } = req.params;
    const key = id_or_value.toLowerCase();
    const item = store.get(key);
    if (!item)
        return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(item);
};
export const filterByNaturalLanguage = (req, res) => {
    const query = req.query.query;
    const result = service.filterByNaturalLanguage(query);
    return res.status(result.status).json(result.body);
};
export const deleteString = (req, res) => {
    const { id_or_value } = req.params;
    if (!id_or_value)
        return res.status(400).json({ error: 'Missing "id_or_value"' });
    const key = id_or_value.toLowerCase();
    if (!store.has(key))
        return res.status(404).json({ error: 'Not found' });
    store.delete(key);
    return res.status(204).end();
};
