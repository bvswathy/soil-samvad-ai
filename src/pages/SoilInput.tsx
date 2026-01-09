import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Mic, PenLine, History, Sparkles } from 'lucide-react';
import { MobileLayout, Header, Content } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { ActionCard, GlassCard } from '@/components/GlassCard';
import { BottomNav } from '@/components/BottomNav';
import { useTranslation } from '@/contexts/AppContext';

export default function SoilInput() {
  const navigate = useNavigate();
  const t = useTranslation();

  const inputMethods = [
    {
      id: 'image',
      icon: <Camera className="w-10 h-10" />,
      title: t.uploadImage,
      description: 'AI-powered soil analysis',
      variant: 'leaf' as const,
      path: '/soil/image',
      badge: 'AI Vision',
    },
    {
      id: 'manual',
      icon: <PenLine className="w-10 h-10" />,
      title: t.manualEntry,
      description: 'Enter soil test values',
      variant: 'soil' as const,
      path: '/soil/manual',
    },
    {
      id: 'voice',
      icon: <Mic className="w-10 h-10" />,
      title: t.voiceInput,
      description: 'Speak in your language',
      variant: 'accent' as const,
      path: '/soil/voice',
      badge: 'Multi-language',
    },
  ];

  return (
    <MobileLayout gradient="earth">
      <Header 
        title={t.soilAnalysis}
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-leaf flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Analyze Your Soil
          </h2>
          <p className="text-muted-foreground">
            Choose how you want to input your soil data
          </p>
        </div>

        {/* Input Methods */}
        <div className="space-y-4 mb-8">
          {inputMethods.map((method, index) => (
            <GlassCard
              key={method.id}
              onClick={() => navigate(method.path)}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  method.variant === 'leaf' ? 'bg-leaf/10 text-leaf' :
                  method.variant === 'soil' ? 'bg-soil/10 text-soil' :
                  'bg-accent/10 text-accent'
                }`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{method.title}</h3>
                    {method.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Recent Analysis */}
        <GlassCard className="animate-slide-up" style={{ animationDelay: '300ms' } as React.CSSProperties}>
          <div className="flex items-center gap-3 mb-4">
            <History className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Recent Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                🌱
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">North Field - Plot A</p>
                <p className="text-xs text-muted-foreground">2 days ago • pH 6.8</p>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-soil/10 flex items-center justify-center">
                🌾
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">South Field - Plot B</p>
                <p className="text-xs text-muted-foreground">1 week ago • pH 7.2</p>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </div>
        </GlassCard>

        {/* Tip Card */}
        <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-foreground">
            💡 <strong>Tip:</strong> For best results, take soil samples from multiple spots in your field and mix them together before analysis.
          </p>
        </div>
      </Content>

      <BottomNav />
    </MobileLayout>
  );
}
