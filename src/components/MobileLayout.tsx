import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
  gradient?: 'earth' | 'sky' | 'sunrise' | 'default';
}

const gradients = {
  earth: 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
  sky: 'bg-gradient-to-b from-accent/20 via-background to-background',
  sunrise: 'bg-gradient-to-br from-secondary/20 via-background to-harvest/10',
  default: 'bg-background',
};

export function MobileLayout({ 
  children, 
  className,
  showNav = false,
  gradient = 'default'
}: MobileLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen w-full max-w-md mx-auto relative overflow-hidden",
      gradients[gradient],
      className
    )}>
      <div className="safe-area-top" />
      <main className="relative z-10 min-h-screen flex flex-col">
        {children}
      </main>
      <div className="safe-area-bottom" />
    </div>
  );
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export function Header({ title, subtitle, leftAction, rightAction, className }: HeaderProps) {
  return (
    <header className={cn("px-4 py-3 flex items-center justify-between", className)}>
      <div className="w-12">{leftAction}</div>
      <div className="flex-1 text-center">
        {title && <h1 className="text-lg font-bold text-foreground">{title}</h1>}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="w-12 flex justify-end">{rightAction}</div>
    </header>
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Content({ children, className, padding = true }: ContentProps) {
  return (
    <div className={cn(
      "flex-1 overflow-y-auto no-scrollbar",
      padding && "px-4 pb-6",
      className
    )}>
      {children}
    </div>
  );
}

interface FooterProps {
  children: ReactNode;
  className?: string;
}

export function Footer({ children, className }: FooterProps) {
  return (
    <footer className={cn(
      "px-4 py-4 glass-card border-t border-border/50",
      className
    )}>
      {children}
    </footer>
  );
}
