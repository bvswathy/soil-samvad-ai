import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Cloud, Sun, Droplets, TrendingUp, Gift, 
  Wifi, WifiOff, Bell, Settings, ChevronRight 
} from 'lucide-react';
import { MobileLayout, Header, Content } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { GlassCard, InfoCard, ActionCard } from '@/components/GlassCard';
import { CircularProgress, ProgressBar } from '@/components/ProgressIndicator';
import { BottomNav } from '@/components/BottomNav';
import { useApp, useTranslation } from '@/contexts/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { farmerProfile, isOnline, soilData } = useApp();
  const t = useTranslation();

  // Mock weather data
  const weather = {
    temp: 32,
    humidity: 65,
    rainfall: '45%',
    condition: 'Partly Cloudy',
  };

  return (
    <MobileLayout gradient="earth">
      <Header 
        leftAction={
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-leaf' : 'bg-destructive'}`} />
            {isOnline ? <Wifi className="w-4 h-4 text-muted-foreground" /> : <WifiOff className="w-4 h-4 text-destructive" />}
          </div>
        }
        rightAction={
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        }
      />
      
      <Content className="pb-24">
        {/* Welcome Section */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">
            {t.welcome}, {farmerProfile?.name || 'Farmer'}! 👋
          </h1>
          <p className="text-muted-foreground">
            {farmerProfile?.village || 'Your Village'}, {farmerProfile?.district || 'District'}
          </p>
        </div>

        {/* Weather Card */}
        <GlassCard className="mb-4 animate-slide-up" variant="highlight">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{weather.condition}</p>
              <p className="text-4xl font-bold text-foreground">{weather.temp}°C</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="w-4 h-4 text-water" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Cloud className="w-4 h-4 text-accent" />
                <span>{weather.rainfall} rain</span>
              </div>
            </div>
            <Sun className="w-16 h-16 text-sun animate-pulse-slow" />
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <InfoCard
            icon={<Leaf className="w-6 h-6" />}
            title={t.soilHealth}
            value={soilData ? `${Math.round((soilData.ph / 14) * 100)}%` : '—'}
            subtitle="Last checked today"
            variant="leaf"
          />
          <InfoCard
            icon={<Droplets className="w-6 h-6" />}
            title={t.moisture}
            value={soilData ? `${soilData.moisture}%` : '—'}
            subtitle="Optimal range"
            variant="water"
          />
        </div>

        {/* Soil Health Ring */}
        {soilData && (
          <GlassCard className="mb-6 animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
            <h3 className="font-semibold text-foreground mb-4">Digital Soil Twin</h3>
            <div className="flex items-center justify-around">
              <CircularProgress 
                value={soilData.nitrogen} 
                variant="leaf" 
                label="Nitrogen" 
              />
              <CircularProgress 
                value={soilData.phosphorus} 
                variant="harvest" 
                label="Phosphorus" 
              />
              <CircularProgress 
                value={soilData.potassium} 
                variant="soil" 
                label="Potassium" 
              />
            </div>
          </GlassCard>
        )}

        {/* Quick Actions */}
        <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <ActionCard
            icon={<Leaf className="w-8 h-8" />}
            title={t.soilAnalysis}
            onClick={() => navigate('/soil')}
            variant="leaf"
          />
          <ActionCard
            icon={<Cloud className="w-8 h-8" />}
            title={t.climate}
            onClick={() => navigate('/climate')}
            variant="water"
          />
          <ActionCard
            icon={<Gift className="w-8 h-8" />}
            title={t.schemes}
            onClick={() => navigate('/schemes')}
            variant="harvest"
          />
        </div>

        {/* Active Recommendations */}
        <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Crop Recommendations</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/recommendations')}>
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {soilData ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-leaf/10">
                <div className="text-2xl">🌾</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Paddy (நெல்)</p>
                  <ProgressBar value={85} variant="leaf" size="sm" />
                </div>
                <span className="text-sm font-semibold text-leaf">85%</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-harvest/10">
                <div className="text-2xl">🌽</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Maize (மக்காச்சோளம்)</p>
                  <ProgressBar value={72} variant="harvest" size="sm" />
                </div>
                <span className="text-sm font-semibold text-harvest">72%</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Analyze your soil to get recommendations</p>
              <Button 
                onClick={() => navigate('/soil')} 
                className="mt-3"
                variant="outline"
              >
                Start Analysis
              </Button>
            </div>
          )}
        </GlassCard>
      </Content>

      <BottomNav />
    </MobileLayout>
  );
}
