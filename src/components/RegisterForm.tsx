'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: (data: any) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: ''
  });

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
        onSuccess(result.data);
      } else {
        alert("Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error(error);
      alert("Sunucu bağlantı hatası.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kayıt Sistemi</h2>
          <p className="text-sm text-gray-400">Protokol Katılım Formu</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary uppercase tracking-wider">Ad Soyad</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              required
              type="text" 
              placeholder="Adınızı ve Soyadınızı giriniz"
              className="w-full bg-accent/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary uppercase tracking-wider">E-Posta</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              required
              type="email" 
              placeholder="kurumsal@eposta.com"
              className="w-full bg-accent/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary uppercase tracking-wider">Kurum / Kuruluş</label>
          <div className="relative">
            <Building className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              required
              type="text" 
              placeholder="ASELSAN, BAYKAR, TUSAŞ vb."
              className="w-full bg-accent/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
              value={formData.organization}
              onChange={(e) => setFormData({...formData, organization: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-[#0a0f1e] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] tech-blue-glow"
        >
          KAYDI TAMAMLA
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
