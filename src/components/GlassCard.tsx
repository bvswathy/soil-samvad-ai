import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'highlight' | 'subtle';
  padding?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  style?: React.CSSProperties;
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantClasses = {
  default: 'glass-card',
  highlight: 'glass-card ring-2 ring-primary/20',
  subtle: 'bg-card/50 backdrop-blur-sm border border-border/50',
};

export function GlassCard({ 
  children, 
  className, 
  onClick,
  variant = 'default',
  padding = 'md',
  animated = false,
  style,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variantClasses[variant],
        paddingClasses[padding],
        onClick && "cursor-pointer hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300",
        animated && "animate-scale-in",
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'soil' | 'leaf' | 'water' | 'harvest';
  className?: string;
}

const iconVariantClasses = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/20 text-secondary-foreground',
  accent: 'bg-accent/10 text-accent',
  soil: 'bg-soil/10 text-soil',
  leaf: 'bg-leaf/10 text-leaf',
  water: 'bg-water/10 text-water',
  harvest: 'bg-harvest/10 text-harvest',
};

export function InfoCard({ icon, title, value, subtitle, variant = 'primary', className }: InfoCardProps) {
  return (
    <GlassCard className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center",
        iconVariantClasses[variant]
      )}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground truncate">{title}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </GlassCard>
  );
}

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'soil' | 'leaf' | 'water' | 'harvest';
  className?: string;
  disabled?: boolean;
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  variant = 'primary',
  className,
  disabled = false,
}: ActionCardProps) {
  return (
    <GlassCard 
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex flex-col items-center text-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-3",
        iconVariantClasses[variant]
      )}>
        {icon}
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </GlassCard>
  );
}
