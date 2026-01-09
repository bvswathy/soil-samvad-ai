import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronRight } from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { useApp, Language } from '@/contexts/AppContext';

const languages = [
  { 
    code: 'en' as Language, 
    name: 'English', 
    native: 'English',
    description: 'Continue in English',
    flag: '🇬🇧'
  },
  { 
    code: 'ta' as Language, 
    name: 'Tamil', 
    native: 'தமிழ்',
    description: 'தமிழில் தொடரவும்',
    flag: '🇮🇳'
  },
  { 
    code: 'hi' as Language, 
    name: 'Hindi', 
    native: 'हिन्दी',
    description: 'हिंदी में जारी रखें',
    flag: '🇮🇳'
  },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigate('/profile');
  };

  return (
    <MobileLayout gradient="earth">
      <Header 
        leftAction={
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
        }
      />
      
      <Content className="flex flex-col">
        {/* Title Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Select Your Language
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred language
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-3 flex-1">
          {languages.map((lang, index) => (
            <GlassCard
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              variant={language === lang.code ? 'highlight' : 'default'}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                  {lang.flag}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{lang.native}</h3>
                  <p className="text-sm text-muted-foreground">{lang.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  language === lang.code 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                }`}>
                  {language === lang.code && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Voice Hint */}
        <div className="mt-6 p-4 rounded-2xl bg-accent/10 border border-accent/20">
          <p className="text-sm text-center text-accent-foreground">
            🎤 You can also use voice commands in your selected language throughout the app
          </p>
        </div>
      </Content>

      <Footer>
        <Button 
          onClick={handleContinue}
          className="w-full"
          size="lg"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </Button>
      </Footer>
    </MobileLayout>
  );
}
