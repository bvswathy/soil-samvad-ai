import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mic, MicOff, Volume2, VolumeX, 
  MessageCircle, Send, Loader2, Languages, Sparkles
} from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard } from '@/components/GlassCard';
import { BottomNav } from '@/components/BottomNav';
import { useApp, useTranslation, Language } from '@/contexts/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  contentLocal?: string;
  timestamp: Date;
}

const quickPrompts = {
  en: [
    'What crops should I plant?',
    'Check my soil health',
    'Weather forecast',
    'Government schemes for me',
  ],
  ta: [
    'நான் என்ன பயிர் செய்ய வேண்டும்?',
    'என் மண் ஆரோக்கியத்தை சரிபார்க்கவும்',
    'வானிலை முன்னறிவிப்பு',
    'எனக்கான அரசு திட்டங்கள்',
  ],
  hi: [
    'मुझे कौन सी फसल लगानी चाहिए?',
    'मेरी मिट्टी की जांच करें',
    'मौसम का पूर्वानुमान',
    'मेरे लिए सरकारी योजनाएं',
  ],
};

const mockResponses: Record<string, { en: string; ta: string }> = {
  'crop': {
    en: 'Based on your soil analysis showing pH 6.8 and good moisture levels, I recommend Paddy (நெல்) with 92% confidence. The current monsoon season is ideal for transplanting.',
    ta: 'உங்கள் மண் பகுப்பாய்வின்படி pH 6.8 மற்றும் நல்ல ஈரப்பதம் காணப்படுகிறது. 92% நம்பிக்கையுடன் நெல் பயிரிட பரிந்துரைக்கிறேன். தற்போதைய மழைக்காலம் நடவுக்கு ஏற்றது.',
  },
  'soil': {
    en: 'Your soil is in good condition! pH level is 6.8 (slightly acidic, ideal for most crops). Nitrogen: 75%, Phosphorus: 62%, Potassium: 58%. The loamy texture supports excellent root development.',
    ta: 'உங்கள் மண் நல்ல நிலையில் உள்ளது! pH அளவு 6.8 (சிறிது அமிலத்தன்மை, பெரும்பாலான பயிர்களுக்கு ஏற்றது). நைட்ரஜன்: 75%, பாஸ்பரஸ்: 62%, பொட்டாசியம்: 58%. களிமண் அமைப்பு சிறந்த வேர் வளர்ச்சியை ஆதரிக்கிறது.',
  },
  'weather': {
    en: 'Weather forecast: Today is partly cloudy with 32°C. Heavy rainfall (60-80mm) expected on Wednesday. I recommend completing any pesticide spraying by Tuesday and reducing irrigation.',
    ta: 'வானிலை முன்னறிவிப்பு: இன்று பகுதி மேகமூட்டம் 32°C. புதன்கிழமை கனமழை (60-80மிமீ) எதிர்பார்க்கப்படுகிறது. செவ்வாய்க்குள் பூச்சிக்கொல்லி தெளிப்பை முடிக்கவும், நீர்ப்பாசனத்தை குறைக்கவும் பரிந்துரைக்கிறேன்.',
  },
  'scheme': {
    en: 'You are eligible for 5 government schemes! Top matches: PM-KISAN (₹6,000/year - 95% match), PM Fasal Bima Yojana (88% match - deadline Jul 31), and Soil Health Card (100% match - free soil testing).',
    ta: 'நீங்கள் 5 அரசு திட்டங்களுக்கு தகுதியானவர்! சிறந்த பொருத்தங்கள்: PM-KISAN (₹6,000/வருடம் - 95% பொருத்தம்), PM பசல் பீமா யோஜனா (88% பொருத்தம் - ஜூலை 31 கடைசி நாள்), மண் ஆரோக்கிய அட்டை (100% பொருத்தம் - இலவச மண் பரிசோதனை).',
  },
};

export default function VoiceAssistant() {
  const navigate = useNavigate();
  const { language } = useApp();
  const t = useTranslation();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am KrishiMitra, your AI farming assistant. How can I help you today?',
      contentLocal: 'வணக்கம்! நான் கிருஷிமித்ரா, உங்கள் AI விவசாய உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ வேண்டும்?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let responseKey = 'crop';
      const lowerText = text.toLowerCase();
      if (lowerText.includes('soil') || lowerText.includes('மண்') || lowerText.includes('मिट्टी')) {
        responseKey = 'soil';
      } else if (lowerText.includes('weather') || lowerText.includes('வானிலை') || lowerText.includes('मौसम')) {
        responseKey = 'weather';
      } else if (lowerText.includes('scheme') || lowerText.includes('திட்ட') || lowerText.includes('योजना')) {
        responseKey = 'scheme';
      }

      const response = mockResponses[responseKey];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.en,
        contentLocal: response.ta,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would use the Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setInputText(quickPrompts[language][0]);
        setIsListening(false);
      }, 2000);
    }
  };

  const speakMessage = (message: Message) => {
    if ('speechSynthesis' in window) {
      const text = language === 'ta' && message.contentLocal ? message.contentLocal : message.content;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <MobileLayout gradient="earth">
      <Header 
        title={t.assistant}
        subtitle="AI குரல் உதவியாளர்"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
        rightAction={
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
            <Languages className="w-3 h-3" />
            {language.toUpperCase()}
          </div>
        }
      />
      
      <Content className="pb-48 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'glass-card rounded-bl-sm'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary">KrishiMitra</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                {message.role === 'assistant' && message.contentLocal && language !== 'en' && (
                  <p className="text-sm mt-2 pt-2 border-t border-border/50 text-muted-foreground">
                    {message.contentLocal}
                  </p>
                )}
                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-8"
                    onClick={() => speakMessage(message)}
                    disabled={isSpeaking}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                    <span className="ml-1 text-xs">Listen</span>
                  </Button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="glass-card rounded-2xl rounded-bl-sm p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts[language].map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-full text-sm bg-muted hover:bg-muted/80 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </Content>

      <Footer className="flex gap-3">
        {/* Voice Button */}
        <Button
          variant={isListening ? 'destructive' : 'secondary'}
          size="icon-lg"
          onClick={toggleListening}
          className={isListening ? 'animate-pulse' : ''}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        {/* Text Input */}
        <div className="flex-1 flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or speak..."
            className="h-14 bg-muted border-0 rounded-xl"
            onKeyPress={(e) => e.key === 'Enter' && handleSend(inputText)}
          />
          <Button
            size="icon-lg"
            onClick={() => handleSend(inputText)}
            disabled={!inputText.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Footer>

      <BottomNav />
    </MobileLayout>
  );
}
