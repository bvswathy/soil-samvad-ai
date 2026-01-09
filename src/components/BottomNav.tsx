import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Leaf, Cloud, Gift, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/contexts/AppContext';

const navItems = [
  { path: '/dashboard', icon: Home, labelKey: 'dashboard' },
  { path: '/soil', icon: Leaf, labelKey: 'soilAnalysis' },
  { path: '/climate', icon: Cloud, labelKey: 'climate' },
  { path: '/schemes', icon: Gift, labelKey: 'schemes' },
  { path: '/assistant', icon: Mic, labelKey: 'assistant' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto px-2 pb-2">
        <div className="glass-card rounded-2xl p-2 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate max-w-[60px]">
                  {(t as any)[item.labelKey]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
