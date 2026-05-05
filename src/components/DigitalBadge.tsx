'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Calendar, Fingerprint } from 'lucide-react';

interface DigitalBadgeProps {
  data: {
    name: string;
    organization: string;
    email: string;
  };
}

export default function DigitalBadge({ data }: DigitalBadgeProps) {
  const qrValue = JSON.stringify(data);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      className="w-full max-w-sm mx-auto perspective-1000"
    >
      <div className="glass-panel p-6 rounded-3xl border-2 border-primary/40 relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#1e293b] to-[#0a0f1e] tech-blue-glow">
        {/* Badge Header */}
        <div className="flex flex-col items-center mb-8 border-b border-white/10 pb-6 relative">
          <div className="absolute top-0 right-0 p-2 opacity-20">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <div className="bg-primary/20 p-3 rounded-2xl border border-primary/40 mb-4">
            <Fingerprint className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-center leading-none">
            MİLLİ TEKNOLOJİ <br />
            <span className="text-primary">ZİRVESİ 2026</span>
          </h1>
          <div className="mt-2 text-[10px] bg-white/10 px-3 py-0.5 rounded-full text-gray-300 font-bold tracking-widest uppercase">
            RESMİ DELEGE KARTI
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{data.name}</h3>
            <p className="text-primary font-semibold text-sm">{data.organization}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary/60" />
              <span className="text-[10px] text-gray-400 font-medium">ANKARA / ATO</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-primary/60" />
              <span className="text-[10px] text-gray-400 font-medium">05-07 MAYIS</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white p-4 rounded-2xl flex justify-center items-center shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-4">
          <QRCodeCanvas 
            value={qrValue}
            size={180}
            level="H"
            includeMargin={false}
            fgColor="#0a0f1e"
          />
        </div>

        <div className="text-center">
          <p className="text-[9px] text-gray-500 font-mono tracking-tighter">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        {/* Decorative corner */}
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
}
