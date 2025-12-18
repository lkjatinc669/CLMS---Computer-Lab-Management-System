import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "clms.db");

const db = new Database(dbPath);

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS component_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT,
    pc_name TEXT,
    components_name TEXT,
    avalibility TEXT,
    working TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;
