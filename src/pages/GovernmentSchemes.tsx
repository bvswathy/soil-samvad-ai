import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Gift, CheckCircle, ChevronRight, Search,
  Filter, Volume2, Star, Clock, IndianRupee
} from 'lucide-react';
import { MobileLayout, Header, Content } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/GlassCard';
import { ProgressBar } from '@/components/ProgressIndicator';
import { BottomNav } from '@/components/BottomNav';
import { useTranslation, GovernmentScheme } from '@/contexts/AppContext';

const mockSchemes: GovernmentScheme[] = [
  {
    id: '1',
    name: 'PM-KISAN',
    nameLocal: 'பிரதான் மந்திரி கிசான்',
    description: 'Direct income support of ₹6,000/year for small and marginal farmers',
    eligibility: ['Land ownership', 'Valid Aadhaar', 'Bank account'],
    benefits: '₹6,000 per year in 3 installments',
    matchScore: 95,
  },
  {
    id: '2',
    name: 'PM Fasal Bima Yojana',
    nameLocal: 'பிரதான் மந்திரி பசல் பீமா யோஜனா',
    description: 'Crop insurance scheme protecting against natural calamities',
    eligibility: ['Loanee farmers', 'Non-loanee farmers', 'Sharecroppers'],
    benefits: 'Insurance coverage for crop loss',
    deadline: 'Jul 31, 2024',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Soil Health Card Scheme',
    nameLocal: 'மண் ஆரோக்கிய அட்டை திட்டம்',
    description: 'Free soil testing and nutrient recommendations',
    eligibility: ['All farmers', 'Valid ID proof'],
    benefits: 'Free soil analysis + recommendations',
    matchScore: 100,
  },
  {
    id: '4',
    name: 'Kisan Credit Card',
    nameLocal: 'கிசான் கிரெடிட் கார்டு',
    description: 'Easy credit for agricultural needs at low interest rates',
    eligibility: ['Land record', 'ID proof', 'Passport photo'],
    benefits: 'Credit up to ₹3 lakh at 4% interest',
    matchScore: 82,
  },
  {
    id: '5',
    name: 'National Agriculture Market (e-NAM)',
    nameLocal: 'தேசிய வேளாண் சந்தை',
    description: 'Online trading platform for agricultural commodities',
    eligibility: ['Farmers', 'Traders', 'Buyers'],
    benefits: 'Direct market access, better prices',
    matchScore: 70,
  },
];

export default function GovernmentSchemes() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  const filteredSchemes = mockSchemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.nameLocal.includes(searchQuery)
  );

  const speakScheme = (scheme: GovernmentScheme) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${scheme.nameLocal}. ${scheme.description}. நன்மைகள்: ${scheme.benefits}`
      );
      utterance.lang = 'ta-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <MobileLayout gradient="sunrise">
      <Header 
        title={t.schemes}
        subtitle="அரசு திட்டங்கள்"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card border-0 rounded-xl"
          />
        </div>

        {/* Match Summary */}
        <GlassCard className="mb-6 animate-fade-in" variant="highlight">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-harvest/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-harvest" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Schemes Matched for You</h3>
              <p className="text-sm text-muted-foreground">Based on your profile & crop selection</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-leaf">
              <Star className="w-4 h-4" />
              <span>{filteredSchemes.filter(s => s.matchScore > 80).length} High Match</span>
            </div>
            <div className="flex items-center gap-1 text-harvest">
              <Clock className="w-4 h-4" />
              <span>1 Deadline Soon</span>
            </div>
          </div>
        </GlassCard>

        {/* Schemes List */}
        <div className="space-y-3">
          {filteredSchemes.map((scheme, index) => (
            <GlassCard 
              key={scheme.id}
              onClick={() => setSelectedScheme(selectedScheme?.id === scheme.id ? null : scheme)}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  scheme.matchScore > 80 ? 'bg-leaf/10 text-leaf' : 
                  scheme.matchScore > 60 ? 'bg-harvest/10 text-harvest' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  <span className="text-lg font-bold">{scheme.matchScore}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground truncate">{scheme.name}</h4>
                    {scheme.deadline && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-harvest/10 text-harvest whitespace-nowrap">
                        Deadline: {scheme.deadline}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{scheme.nameLocal}</p>
                  <ProgressBar 
                    value={scheme.matchScore} 
                    variant={scheme.matchScore > 80 ? 'leaf' : 'harvest'} 
                    size="sm" 
                    className="mt-2"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakScheme(scheme);
                  }}
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>

              {selectedScheme?.id === scheme.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
                  <p className="text-sm text-foreground">{scheme.description}</p>
                  
                  {/* Benefits */}
                  <div className="p-3 rounded-xl bg-leaf/10">
                    <p className="text-xs text-muted-foreground mb-1">{t.benefits}</p>
                    <p className="font-semibold text-leaf flex items-center gap-2">
                      <IndianRupee className="w-4 h-4" />
                      {scheme.benefits}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">{t.eligibility}</p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.eligibility.map((item, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-muted"
                        >
                          <CheckCircle className="w-3 h-3 text-leaf" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant="harvest">
                    {t.apply}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Voice Hint */}
        <div className="mt-6 p-4 rounded-2xl bg-accent/10 border border-accent/20">
          <p className="text-sm text-center text-foreground">
            🔊 Tap the speaker icon to hear scheme details in Tamil
          </p>
        </div>
      </Content>

      <BottomNav />
    </MobileLayout>
  );
}
