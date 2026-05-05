import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

    const userIndex = db.findIndex((u: any) => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ success: false, message: 'Geçersiz QR Kod! Kayıt bulunamadı.' }, { status: 404 });
    }

    if (db[userIndex].scanned) {
      return NextResponse.json({ 
        success: false, 
        message: 'GİRİŞ REDDEDİLDİ! Bu kart daha önce kullanılmış.',
        user: db[userIndex] 
      }, { status: 403 });
    }

    // Mark as scanned
    db[userIndex].scanned = true;
    db[userIndex].scanTime = new Date().toISOString();
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'GİRİŞ ONAYLANDI. Hoş geldiniz.',
      user: db[userIndex]
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Sistem hatası.' }, { status: 500 });
  }
}
