'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterForm from '@/components/RegisterForm';
import QRScanner from '@/components/QRScanner';
import DigitalBadge from '@/components/DigitalBadge';
import { Scan, UserPlus, ShieldAlert, Cpu } from 'lucide-react';
import { toast } from 'sonner';


export default function Home() {
  const [view, setView] = useState<'landing' | 'register' | 'scan' | 'badge' | 'staff-login'>('landing');
  const [userData, setUserData] = useState<any>(null);
  const [staffPassword, setStaffPassword] = useState('');
  const [isStaff, setIsStaff] = useState(false);

  const handleRegisterSuccess = (data: any) => {
    setUserData(data);
    setView('badge');
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffPassword === 'MTZ2026') { // Simple demo password
      setIsStaff(true);
      setView('scan');
      toast.success("Görevli girişi başarılı.");
    } else {
      toast.error("Hatalı Görevli Şifresi!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center z-10 space-y-12"
          >
            <div className="space-y-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-auto w-24 h-24 border-2 border-primary/20 rounded-full flex items-center justify-center relative"
              >
                <Cpu className="w-10 h-10 text-primary" />
                <div className="absolute inset-0 border-t-2 border-primary rounded-full" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                MİLLİ TEKNOLOJİ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ZİRVESİ 2026</span>
              </h1>
              <p className="text-gray-400 font-medium tracking-[0.3em] text-sm md:text-base">
                GELECEĞİN TEKNOLOJİLERİ BURADA FORMÜLİZE EDİLİYOR
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('register')}
                className="group relative px-8 py-4 bg-primary text-[#0a0f1e] font-bold rounded-xl flex items-center gap-3 tech-blue-glow transition-all hover:scale-105 active:scale-95"
              >
                <UserPlus className="w-5 h-5" />
                KATILIMCI KAYDI
              </button>
              <button 
                onClick={() => setView('staff-login')}
                className="group relative px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl flex items-center gap-3 backdrop-blur-md hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
              >
                <Scan className="w-5 h-5 text-primary" />
                GÖREVLİ GİRİŞİ
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-12 opacity-40">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest">YÜKSEK GÜVENLİK</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest">PROTOKOL ERİŞİMİ</span>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'staff-login' && (
          <motion.div key="staff-login" className="w-full max-w-md glass-panel p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Görevli Kimlik Doğrulama</h2>
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Görevli Şifresi"
                className="w-full bg-accent/50 border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-primary/50"
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}
              />
              <button className="w-full bg-primary text-black font-bold py-3 rounded-lg">GİRİŞ YAP</button>
              <button type="button" onClick={() => setView('landing')} className="w-full text-gray-500 text-sm">Geri Dön</button>
            </form>
          </motion.div>
        )}

        {view === 'register' && (
          <div key="register" className="w-full flex flex-col items-center gap-8">
            <RegisterForm onSuccess={handleRegisterSuccess} />
            <button 
              onClick={() => setView('landing')}
              className="text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              İPTAL ET
            </button>
          </div>
        )}

        {view === 'scan' && isStaff && (
          <QRScanner 
            key="scan"
            onScan={(data) => {
              setUserData(data);
              setView('badge');
            }} 
            onClose={() => setView('landing')} 
          />
        )}

        {view === 'badge' && userData && (
          <div key="badge" className="w-full flex flex-col items-center gap-8">
            <DigitalBadge data={userData} />
            <div className="flex gap-4">
              <button 
                onClick={() => setView('landing')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all"
              >
                ANA SAYFA
              </button>
              <button 
                onClick={() => window.print()}
                className="px-6 py-2 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 rounded-lg text-sm font-bold transition-all"
              >
                KARTI KAYDET
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
