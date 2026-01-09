import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Leaf, Droplets, AlertTriangle, TrendingUp,
  ChevronDown, ChevronUp, CheckCircle, XCircle, Brain,
  Sparkles
} from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { ProgressBar, CircularProgress } from '@/components/ProgressIndicator';
import { BottomNav } from '@/components/BottomNav';
import { useTranslation, CropRecommendation } from '@/contexts/AppContext';

// Mock recommendations
const mockRecommendations: CropRecommendation[] = [
  {
    name: 'Paddy',
    nameLocal: 'நெல்',
    confidence: 92,
    season: 'Kharif (Jun-Nov)',
    duration: '120-150 days',
    waterNeed: 'high',
    riskLevel: 'low',
    expectedYield: '5-6 tonnes/ha',
    marketPrice: '₹2,040/quintal',
    reasoning: [
      'Soil pH 6.8 is optimal for paddy cultivation',
      'High moisture content (42%) suitable for wetland paddy',
      'Current monsoon forecast shows adequate rainfall',
      'Historical yield data shows 85% success rate in your region',
    ],
  },
  {
    name: 'Maize',
    nameLocal: 'மக்காச்சோளம்',
    confidence: 78,
    season: 'Kharif (Jun-Sep)',
    duration: '90-120 days',
    waterNeed: 'medium',
    riskLevel: 'low',
    expectedYield: '8-10 tonnes/ha',
    marketPrice: '₹1,962/quintal',
    reasoning: [
      'Good nitrogen levels support maize growth',
      'Loamy soil texture is ideal',
      'Lower water requirement suits variable rainfall',
      'Strong market demand in your district',
    ],
  },
  {
    name: 'Groundnut',
    nameLocal: 'நிலக்கடலை',
    confidence: 65,
    season: 'Kharif/Rabi',
    duration: '100-130 days',
    waterNeed: 'low',
    riskLevel: 'medium',
    expectedYield: '1.5-2 tonnes/ha',
    marketPrice: '₹5,550/quintal',
    reasoning: [
      'Sandy loam component in soil supports root development',
      'Moderate risk due to potential heavy rainfall',
      'Good phosphorus levels benefit legume crops',
      'Premium market prices offset moderate risk',
    ],
  },
];

const eliminatedCrops = [
  { name: 'Cotton', nameLocal: 'பருத்தி', reason: 'High pest pressure in current climate' },
  { name: 'Sugarcane', nameLocal: 'கரும்பு', reason: 'Water-intensive, high risk with variable monsoon' },
];

export default function CropRecommendations() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [expandedCrop, setExpandedCrop] = useState<string | null>(mockRecommendations[0].name);
  const [showEliminated, setShowEliminated] = useState(false);

  const getWaterIcon = (level: string) => {
    const count = level === 'high' ? 3 : level === 'medium' ? 2 : 1;
    return Array(count).fill(null).map((_, i) => (
      <Droplets key={i} className="w-4 h-4 text-water" />
    ));
  };

  const getRiskColor = (level: string) => {
    return level === 'high' ? 'text-destructive' : level === 'medium' ? 'text-harvest' : 'text-leaf';
  };

  return (
    <MobileLayout gradient="earth">
      <Header 
        title={t.recommendations}
        subtitle="பயிர் பரிந்துரைகள்"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        {/* AI Analysis Summary */}
        <GlassCard className="mb-6 animate-fade-in" variant="highlight">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Analysis Complete</h3>
              <p className="text-sm text-muted-foreground">Based on soil + climate + risk factors</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-leaf">3</p>
              <p className="text-xs text-muted-foreground">Recommended</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-harvest">2</p>
              <p className="text-xs text-muted-foreground">Eliminated</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold text-primary">92%</p>
              <p className="text-xs text-muted-foreground">Top Match</p>
            </div>
          </div>
        </GlassCard>

        {/* Recommendations */}
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Recommended Crops
        </h3>
        
        <div className="space-y-3 mb-6">
          {mockRecommendations.map((crop, index) => (
            <GlassCard 
              key={crop.name}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setExpandedCrop(expandedCrop === crop.name ? null : crop.name)}
              >
                <CircularProgress 
                  value={crop.confidence} 
                  size={50}
                  variant={crop.confidence > 80 ? 'leaf' : crop.confidence > 60 ? 'harvest' : 'soil'}
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{crop.name}</h4>
                  <p className="text-sm text-muted-foreground">{crop.nameLocal}</p>
                </div>
                {expandedCrop === crop.name ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {expandedCrop === crop.name && (
                <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Season</p>
                      <p className="text-sm font-medium">{crop.season}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="text-sm font-medium">{crop.duration}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Water Need</p>
                      <div className="flex gap-0.5">{getWaterIcon(crop.waterNeed)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                      <p className={`text-sm font-medium capitalize ${getRiskColor(crop.riskLevel)}`}>
                        {crop.riskLevel}
                      </p>
                    </div>
                  </div>

                  {/* Economic Data */}
                  <div className="flex gap-3">
                    <div className="flex-1 p-3 rounded-xl bg-leaf/10">
                      <p className="text-xs text-muted-foreground">Expected Yield</p>
                      <p className="font-semibold text-leaf">{crop.expectedYield}</p>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-primary/10">
                      <p className="text-xs text-muted-foreground">Market Price</p>
                      <p className="font-semibold text-primary">{crop.marketPrice}</p>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      Why this crop?
                    </p>
                    <ul className="space-y-1.5">
                      {crop.reasoning.map((reason, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => navigate('/schemes')}
                    className="w-full"
                    variant="outline"
                  >
                    View Related Schemes
                  </Button>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Eliminated Crops */}
        <div className="mb-4">
          <button
            onClick={() => setShowEliminated(!showEliminated)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <AlertTriangle className="w-4 h-4" />
            {showEliminated ? 'Hide' : 'Show'} Eliminated Crops ({eliminatedCrops.length})
            {showEliminated ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showEliminated && (
          <div className="space-y-2 animate-fade-in">
            {eliminatedCrops.map((crop, index) => (
              <GlassCard key={crop.name} className="opacity-60">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-destructive/50" />
                  <div>
                    <p className="font-medium text-foreground">{crop.name} ({crop.nameLocal})</p>
                    <p className="text-sm text-muted-foreground">{crop.reason}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </Content>

      <BottomNav />
    </MobileLayout>
  );
}
