'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { Target, X, Zap } from 'lucide-react';

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScan(decodedText);
      },
      (error) => {
        // quiet fail
      }
    );

    return () => {
      scanner.clear().catch(err => console.error("Failed to clear scanner", err));
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg aspect-square glass-panel rounded-3xl overflow-hidden border-2 border-primary/30"
      >
        {/* HUD Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="w-12 h-12 text-primary/40 animate-pulse" />
          </div>

          <div className="absolute top-8 left-0 w-full flex justify-center">
            <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary/50">
              <Zap className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">HEDEF TARANIYOR...</span>
            </div>
          </div>

          <div className="scan-line" />
        </div>

        {/* Scanner Container */}
        <div id="reader" className="w-full h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full [&_#reader__status_span]:hidden [&_#reader__dashboard]:bg-transparent [&_#reader__dashboard_button]:hidden" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-red-500/50 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Demo Button for the USER */}
        <button 
          onClick={() => onScan(JSON.stringify({ name: "Ahmet Yılmaz", organization: "ASELSAN", email: "ahmet@aselsan.com.tr" }))}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-bold tracking-widest hover:bg-primary/40 transition-all"
        >
          SİMÜLASYON: KART TARA
        </button>
      </motion.div>
    </div>
  );
}
