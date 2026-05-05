'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterForm from '@/components/RegisterForm';
import QRScanner from '@/components/QRScanner';
import DigitalBadge from '@/components/DigitalBadge';
import { 
  Scan, UserPlus, ShieldAlert, Cpu, Eye, EyeOff, 
  LayoutDashboard, Users, CheckCircle, LogOut, Settings, BarChart3 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [view, setView] = useState<'landing' | 'register' | 'admin-panel' | 'badge' | 'staff-login'>('landing');
  const [userData, setUserData] = useState<any>(null);
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [stats, setStats] = useState({ total: 0, checkedIn: 0 });

  // Fetch stats for Admin Panel
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/register'); // For now using the register endpoint as a simple way to get data if needed, or we'll assume a new endpoint later.
      // Simulating stats from the users.json
      const dbResponse = await fetch('/api/scan', { method: 'GET' }); // We might need a proper stats API
    } catch (e) {}
  };

  const handleRegisterSuccess = (data: any) => {
    setUserData(data);
    setView('badge');
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffUsername === 'admin' && staffPassword === 'MTZ2026') {
      setIsStaff(true);
      setView('admin-panel');
      toast.success("Operasyon Merkezi Yetkilendirme Başarılı.");
    } else {
      toast.error("Hatalı Kullanıcı Adı veya Şifre!");
    }
  };

  const handleLogout = () => {
    setIsStaff(false);
    setView('landing');
    setStaffUsername('');
    setStaffPassword('');
    toast.info("Oturum kapatıldı.");
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
          <motion.div key="staff-login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md glass-panel p-8 rounded-3xl border border-primary/20">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <ShieldAlert className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-black mb-8 text-center tracking-tight uppercase">Görevli Yetkilendirme</h2>
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Kullanıcı Adı</label>
                <input 
                  type="text" 
                  placeholder="Yönetici Kimliği"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:border-primary/50 transition-all font-bold"
                  value={staffUsername}
                  onChange={(e) => setStaffUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Erişim Şifresi</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 pr-12 outline-none focus:border-primary/50 transition-all font-bold"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button className="w-full bg-primary text-black font-black py-4 rounded-xl tech-blue-glow active:scale-95 transition-all mt-4">SİSTEME ERİŞİM SAĞLA</button>
              <button type="button" onClick={() => setView('landing')} className="w-full text-gray-500 text-sm font-bold uppercase tracking-widest mt-4">İptal Et</button>
            </form>
          </motion.div>
        )}

        {view === 'admin-panel' && isStaff && (
          <motion.div key="admin-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl space-y-8">
            {/* Admin Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-panel p-6 rounded-3xl border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">MTZ Operasyon Merkezi</h2>
                  <p className="text-[10px] text-primary font-bold tracking-[0.2em]">HOŞ GELDİNİZ, {staffUsername.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  GÜVENLİ ÇIKIŞ
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg"><Users className="w-5 h-5 text-blue-500" /></div>
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Toplam Kayıt</p>
                  <h3 className="text-3xl font-black mt-1">--</h3>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-secondary/10 rounded-lg"><CheckCircle className="w-5 h-5 text-secondary" /></div>
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Giriş Yapanlar</p>
                  <h3 className="text-3xl font-black mt-1">--</h3>
                </div>
              </div>
              <button 
                onClick={() => setShowScanner(true)}
                className="glass-panel p-6 rounded-2xl border border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all group flex flex-col justify-center items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 scan-line opacity-20 pointer-events-none" />
                <div className="p-4 bg-primary rounded-full group-hover:scale-110 transition-transform">
                  <Scan className="w-8 h-8 text-black" />
                </div>
                <p className="font-black text-primary tracking-widest text-xs">TARAYICIYI BAŞLAT</p>
              </button>
            </div>

            {/* Logs Placeholder */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-gray-500" />
                <h4 className="text-sm font-bold uppercase tracking-widest">Sistem Logları</h4>
              </div>
              <div className="h-48 flex flex-col items-center justify-center text-gray-600 space-y-2 border border-dashed border-white/10 rounded-2xl">
                <ShieldAlert className="w-8 h-8 opacity-20" />
                <p className="text-[10px] font-bold tracking-widest uppercase">Anlık Veri Bekleniyor...</p>
              </div>
            </div>
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

        {showScanner && isStaff && (
          <QRScanner 
            key="scan"
            onScan={(data) => {
              setUserData(data);
              setShowScanner(false);
              setView('badge');
            }} 
            onClose={() => setShowScanner(false)} 
          />
        )}

        {view === 'badge' && userData && (
          <div key="badge" className="w-full flex flex-col items-center gap-8">
            <DigitalBadge data={userData} />
            <div className="flex gap-4">
              <button 
                onClick={() => setView(isStaff ? 'admin-panel' : 'landing')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all uppercase tracking-widest"
              >
                {isStaff ? 'Panele Dön' : 'Ana Sayfa'}
              </button>
              <button 
                onClick={() => window.print()}
                className="px-6 py-2 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 rounded-lg text-sm font-bold transition-all uppercase tracking-widest"
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
