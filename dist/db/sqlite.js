import Database from 'better-sqlite3';
const db = new Database('./data/db.sqlite');
db.exec(`
  CREATE TABLE IF NOT EXISTS strings (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    properties TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);
const insertString = db.prepare('INSERT INTO strings (id, value, properties, created_at) VALUES (?, ?, ?, ?)');
const getById = db.prepare('SELECT * FROM strings WHERE id = ?');
const getByValue = db.prepare('SELECT * FROM strings WHERE value = ?');
const getAll = db.prepare('SELECT * FROM strings');
const deleteById = db.prepare('DELETE FROM strings WHERE id = ?');
export default {
    insertString: ({ id, value, properties, created_at }) => insertString.run(id, value, properties, created_at),
    getStringById: (id) => getById.get(id),
    getStringByValue: (value) => getByValue.get(value),
    getAllStrings: () => getAll.all(),
    deleteStringById: (id) => deleteById.run(id)
};
