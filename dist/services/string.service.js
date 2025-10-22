import db from '../db/sqlite.js';
import { analyzeString } from '../utils/analyzer.js';
import { parseNaturalLanguageQuery } from '../utils/nlp.js';
import crypto from 'crypto';
export const createString = (value) => {
    if (typeof value !== 'string')
        return { status: 422, body: { error: '"value" must be a string' } };
    const id = crypto.createHash('sha256').update(value, 'utf8').digest('hex');
    const exists = db.getStringById(id);
    if (exists)
        return { status: 409, body: { error: 'String already exists' } };
    const properties = analyzeString(value);
    const created_at = new Date().toISOString();
    db.insertString({ id, value, properties: JSON.stringify(properties), created_at });
    return { status: 201, body: { id, value, properties, created_at } };
};
export const getStringByIdOrValue = (id_or_value) => {
    const isHash = /^[0-9a-f]{64}$/i.test(id_or_value);
    const raw = isHash
        ? db.getStringById(id_or_value)
        : db.getStringByValue(decodeURIComponent(id_or_value));
    const row = raw;
    if (!row)
        return { status: 404, body: { error: 'Not found' } };
    return { status: 200, body: { ...row, properties: JSON.parse(row.properties) } };
};
export const getAllStrings = (query) => {
    const rows = db.getAllStrings().map((r) => ({ ...r, properties: JSON.parse(r.properties) }));
    return { status: 200, body: { data: rows, count: rows.length, filters_applied: query } };
};
export const filterByNaturalLanguage = (query) => {
    if (!query)
        return { status: 400, body: { error: 'Missing query param' } };
    const parsed = parseNaturalLanguageQuery(query);
    if (!parsed.ok)
        return { status: 400, body: { error: parsed.error } };
    return { status: 200, body: { interpreted_query: parsed } };
};
export const deleteString = (id_or_value) => {
    const isHash = /^[0-9a-f]{64}$/i.test(id_or_value);
    const row = (isHash
        ? db.getStringById(id_or_value)
        : db.getStringByValue(decodeURIComponent(id_or_value)));
    if (!row)
        return { status: 404, body: { error: 'Not found' } };
    db.deleteStringById(row.id);
    return { status: 204 };
};
