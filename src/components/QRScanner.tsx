'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { Target, X, Zap } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: any) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    const handleScan = async (decodedText: string) => {
      try {
        // Parse ID from QR (assuming it's the JSON object from DigitalBadge)
        const qrData = JSON.parse(decodedText);
        const id = qrData.id;

        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        setResult({ success: data.success, message: data.message });

        if (data.success) {
          setTimeout(() => {
            onScan(data.user);
          }, 2000);
        }
      } catch (e) {
        setResult({ success: false, message: "Geçersiz MTZ Kartı!" });
      }
    };

    scanner.render(handleScan, () => {});

    return () => {
      scanner.clear().catch(() => {});
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
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">GÖREVLİ TARAMA MODU</span>
            </div>
          </div>

          <div className="scan-line" />

          {/* Result Overlay */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute inset-0 z-30 flex items-center justify-center p-8 text-center ${result.success ? 'bg-secondary/90' : 'bg-red-900/90'}`}
              >
                <div>
                  <h2 className="text-3xl font-black mb-2 uppercase">{result.success ? 'GİRİŞ ONAYLANDI' : 'ERİŞİM REDDEDİLDİ'}</h2>
                  <p className="font-bold">{result.message}</p>
                  {!result.success && (
                    <button 
                      onClick={() => setResult(null)}
                      className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg"
                    >
                      TEKRAR DENE
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanner Container */}
        <div id="reader" className="w-full h-full [&_video]:object-cover [&_video]:w-full [&_video]:h-full [&_#reader__status_span]:hidden [&_#reader__dashboard]:bg-transparent [&_#reader__dashboard_button]:hidden" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-red-500/50 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
}
    </div>
  );
}
