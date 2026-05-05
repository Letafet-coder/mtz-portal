'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Building, ArrowRight, ShieldCheck, 
  Cpu, Hash, Phone, Briefcase, GraduationCap, Shield 
} from 'lucide-react';
import { toast } from 'sonner';

interface RegisterFormProps {
  onSuccess: (data: any) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    delegateType: 'KATILIMCI',
    name: '',
    schoolNumber: '',
    organization: '',
    phone: '',
    email: ''
  });

  const delegateTypes = [
    { id: 'KATILIMCI', label: 'KATILIMCI', icon: User },
    { id: 'GÖREVLİ', label: 'GÖREVLİ', icon: Shield },
    { id: 'İNSAN KAYNAKLARI', label: 'İNSAN KAYNAKLARI', icon: Briefcase },
    { id: 'AKADEMİ / ÖĞRENCİ', label: 'AKADEMİ / ÖĞRENCİ', icon: GraduationCap },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success("Kayıt başarıyla oluşturuldu.");
        onSuccess(result.data);
      } else {
        toast.error("Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sunucu bağlantı hatası.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-3xl relative overflow-hidden border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Cpu className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">Katılımcı Kaydı</h2>
          <p className="text-xs text-gray-500 font-bold tracking-[0.2em] mt-1">SİSTEM ERİŞİMİ VE DELEGE TANIMLAMA</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Delegate Type Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Delege Tipi</label>
          <div className="grid grid-cols-2 gap-3">
            {delegateTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, delegateType: type.id })}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  formData.delegateType === type.id 
                  ? 'bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-xs font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required
                type="text" 
                placeholder="AD SOYAD"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm font-bold uppercase tracking-tight"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Okul Numarası</label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required
                type="text" 
                placeholder="Örn: 220101001"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm font-bold tracking-tight"
                value={formData.schoolNumber}
                onChange={(e) => setFormData({...formData, schoolNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Kurum / Üniversite</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required
                type="text" 
                placeholder="KURUM / ÜNİVERSİTE"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm font-bold tracking-tight"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">İletişim No</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required
                type="text" 
                placeholder="05XX XXX XX XX"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm font-bold tracking-tight"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Kurumsal E-Posta</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              required
              type="email" 
              placeholder="E-POSTA ADRESİ"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-primary/50 outline-none transition-all text-sm font-bold tracking-tight"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-[#0a0f1e] font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] tech-blue-glow shadow-[0_0_20px_rgba(0,240,255,0.3)] text-base"
        >
          <ShieldCheck className="w-6 h-6" />
          KAYDI ONAYLA VE GİRİŞ YAP
          <ArrowRight className="w-6 h-6" />
        </button>
      </form>
    </motion.div>
  );
}
