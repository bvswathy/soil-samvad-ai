import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Cloud, Sun, Droplets, Wind, Thermometer, 
  TrendingUp, TrendingDown, AlertTriangle, Calendar,
  ChevronRight
} from 'lucide-react';
import { MobileLayout, Header, Content } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { GlassCard, InfoCard } from '@/components/GlassCard';
import { ProgressBar } from '@/components/ProgressIndicator';
import { BottomNav } from '@/components/BottomNav';
import { useTranslation } from '@/contexts/AppContext';

export default function ClimateIntelligence() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'trends'>('current');

  // Mock climate data
  const currentWeather = {
    temp: 32,
    feelsLike: 35,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    condition: 'Partly Cloudy',
    uv: 7,
  };

  const forecast = [
    { day: 'Today', high: 34, low: 26, rain: 20, icon: '⛅' },
    { day: 'Tomorrow', high: 33, low: 25, rain: 45, icon: '🌧️' },
    { day: 'Wed', high: 30, low: 24, rain: 80, icon: '🌧️' },
    { day: 'Thu', high: 29, low: 23, rain: 60, icon: '🌦️' },
    { day: 'Fri', high: 31, low: 25, rain: 30, icon: '⛅' },
    { day: 'Sat', high: 33, low: 26, rain: 10, icon: '☀️' },
  ];

  const riskAlerts = [
    {
      type: 'warning',
      title: 'Heavy Rainfall Expected',
      titleLocal: 'கனமழை எதிர்பார்க்கப்படுகிறது',
      description: 'High rainfall (60-80mm) expected on Wednesday. Consider harvest timing.',
      icon: <Droplets className="w-5 h-5" />,
    },
    {
      type: 'info',
      title: 'Optimal Planting Window',
      titleLocal: 'சிறந்த நடவு நேரம்',
      description: 'Next 3 days are ideal for paddy transplanting based on moisture levels.',
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  const seasonalTrends = [
    { month: 'Jun', rainfall: 120, avgTemp: 30 },
    { month: 'Jul', rainfall: 180, avgTemp: 28 },
    { month: 'Aug', rainfall: 200, avgTemp: 27 },
    { month: 'Sep', rainfall: 160, avgTemp: 28 },
    { month: 'Oct', rainfall: 220, avgTemp: 29 },
    { month: 'Nov', rainfall: 280, avgTemp: 27 },
  ];

  return (
    <MobileLayout gradient="sky">
      <Header 
        title={t.climate}
        subtitle="காலநிலை நுண்ணறிவு"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-muted/50">
          {(['current', 'forecast', 'trends'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-card text-foreground shadow-soft' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'current' ? 'Now' : tab === 'forecast' ? '7 Days' : 'Trends'}
            </button>
          ))}
        </div>

        {activeTab === 'current' && (
          <div className="space-y-4 animate-fade-in">
            {/* Current Weather Card */}
            <GlassCard variant="highlight">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{currentWeather.condition}</p>
                  <p className="text-5xl font-bold text-foreground">{currentWeather.temp}°</p>
                  <p className="text-sm text-muted-foreground">Feels like {currentWeather.feelsLike}°</p>
                </div>
                <Sun className="w-20 h-20 text-sun animate-pulse-slow" />
              </div>
            </GlassCard>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                icon={<Droplets className="w-5 h-5" />}
                title="Humidity"
                value={`${currentWeather.humidity}%`}
                variant="water"
              />
              <InfoCard
                icon={<Wind className="w-5 h-5" />}
                title="Wind"
                value={`${currentWeather.windSpeed} km/h`}
                variant="accent"
              />
              <InfoCard
                icon={<Thermometer className="w-5 h-5" />}
                title="UV Index"
                value={currentWeather.uv}
                subtitle="High"
                variant="harvest"
              />
              <InfoCard
                icon={<Cloud className="w-5 h-5" />}
                title="Rainfall"
                value={`${currentWeather.rainfall}mm`}
                subtitle="Today"
                variant="water"
              />
            </div>

            {/* Risk Alerts */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Climate Alerts</h3>
              {riskAlerts.map((alert, index) => (
                <GlassCard 
                  key={index}
                  className={`border-l-4 ${
                    alert.type === 'warning' ? 'border-l-harvest' : 'border-l-leaf'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      alert.type === 'warning' ? 'bg-harvest/10 text-harvest' : 'bg-leaf/10 text-leaf'
                    }`}>
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mb-1">{alert.titleLocal}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div className="space-y-4 animate-fade-in">
            <GlassCard>
              <h3 className="font-semibold text-foreground mb-4">7-Day Forecast</h3>
              <div className="space-y-3">
                {forecast.map((day, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <span className="w-16 text-sm font-medium text-foreground">{day.day}</span>
                    <span className="text-2xl">{day.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-3 h-3 text-destructive" />
                        <span className="font-medium">{day.high}°</span>
                        <TrendingDown className="w-3 h-3 text-water" />
                        <span className="text-muted-foreground">{day.low}°</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-water">
                      <Droplets className="w-4 h-4" />
                      <span>{day.rain}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Farming Advisory */}
            <GlassCard variant="highlight">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-harvest" />
                Farming Advisory
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span><strong>Irrigation:</strong> Reduce watering before Wednesday's rain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span><strong>Spraying:</strong> Complete pesticide application by Tuesday</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-harvest">!</span>
                  <span><strong>Harvest:</strong> Consider early harvest for mature crops</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-4 animate-fade-in">
            <GlassCard>
              <h3 className="font-semibold text-foreground mb-4">Monsoon Season Trends</h3>
              <div className="space-y-4">
                {seasonalTrends.map((month, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{month.month}</span>
                      <span className="text-water">{month.rainfall}mm</span>
                    </div>
                    <ProgressBar 
                      value={month.rainfall} 
                      max={300} 
                      variant="water" 
                      size="sm" 
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Climate Learning */}
            <GlassCard>
              <h3 className="font-semibold text-foreground mb-3">AI Climate Learning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on 10-year historical data for your region
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-primary/5">
                  <p className="text-sm">
                    <strong>🌧️ Rainfall Pattern:</strong> Your area receives 15% more rainfall than regional average. Plan drainage accordingly.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-harvest/5">
                  <p className="text-sm">
                    <strong>🌡️ Heat Stress Risk:</strong> April-May shows increasing heat stress trend. Consider heat-tolerant varieties.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </Content>

      <BottomNav />
    </MobileLayout>
  );
}
