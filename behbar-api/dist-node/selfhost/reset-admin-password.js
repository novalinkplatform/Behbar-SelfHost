import path from 'node:path';
import { SqliteD1 } from "./sqlite-d1.js";
import { generateSalt, hashPassword } from "../auth.js";
const DATA_DIR = process.env.DATA_DIR ?? '/data';
const DB_PATH = path.join(DATA_DIR, 'behbar.db');
const USERNAME = 'admin';
const [newPassword] = process.argv.slice(2);
if (!newPassword || newPassword.length < 6) {
    console.error('Usage: node reset-admin-password.js <new-password>  (at least 6 characters)');
    process.exit(1);
}
const db = new SqliteD1(DB_PATH);
const staff = await db.prepare('SELECT id FROM staff WHERE username = ?').bind(USERNAME).first();
if (!staff) {
    console.error(`No staff account named "${USERNAME}" was found.`);
    process.exit(1);
}
const salt = generateSalt();
const hash = await hashPassword(newPassword, salt);
await db.prepare('UPDATE staff SET password_hash = ?, password_salt = ? WHERE id = ?').bind(hash, salt, staff.id).run();
console.log(`Password updated for "${USERNAME}".`);
