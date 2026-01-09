import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { MobileLayout } from '@/components/MobileLayout';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => navigate('/language'), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout className="flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-leaf">
      <div className={`flex flex-col items-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse-slow">
            <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
              <Sprout className="w-16 h-16 text-white animate-bounce-gentle" />
            </div>
          </div>
          {/* Decorative rings */}
          <div className="absolute inset-0 -m-4 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 -m-8 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-white mb-2">KrishiMitra</h1>
        <p className="text-white/80 text-lg">Smart Crop Advisory</p>
        
        {/* Tagline in multiple languages */}
        <div className="mt-8 space-y-2 text-center">
          <p className="text-white/60 text-sm">Your AI Farming Companion</p>
          <p className="text-white/60 text-sm">உங்கள் AI விவசாய துணை</p>
          <p className="text-white/60 text-sm">आपका AI कृषि साथी</p>
        </div>

        {/* Loading indicator */}
        <div className="mt-12 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </MobileLayout>
  );
}
