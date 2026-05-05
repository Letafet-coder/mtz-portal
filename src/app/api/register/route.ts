import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Initialize database if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

    // Create unique ID
    const userId = 'MTZ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const newUser = {
      ...userData,
      id: userId,
      scanned: false,
      timestamp: new Date().toISOString()
    };

    db.push(newUser);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    return NextResponse.json({ success: true, data: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Kayıt başarısız.' }, { status: 500 });
  }
}
