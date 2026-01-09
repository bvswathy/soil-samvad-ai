import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, Loader2, CheckCircle, Sparkles, Zap, Eye, Brain } from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { ProgressBar, CircularProgress } from '@/components/ProgressIndicator';
import { useApp, useTranslation, SoilData } from '@/contexts/AppContext';

type AnalysisStep = 'upload' | 'analyzing' | 'results';

interface AnalysisStage {
  id: string;
  name: string;
  nameLocal: string;
  description: string;
  icon: React.ReactNode;
  complete: boolean;
}

export default function SoilImageAnalysis() {
  const navigate = useNavigate();
  const { setSoilData } = useApp();
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<AnalysisStep>('upload');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<SoilData | null>(null);

  const analysisStages: AnalysisStage[] = [
    {
      id: 'vision',
      name: 'AI Vision Processing',
      nameLocal: 'AI பார்வை செயலாக்கம்',
      description: 'Analyzing soil image with computer vision',
      icon: <Eye className="w-5 h-5" />,
      complete: currentStage > 0,
    },
    {
      id: 'texture',
      name: 'Texture Detection',
      nameLocal: 'அமைப்பு கண்டறிதல்',
      description: 'Identifying soil texture and composition',
      icon: <Zap className="w-5 h-5" />,
      complete: currentStage > 1,
    },
    {
      id: 'moisture',
      name: 'Moisture Estimation',
      nameLocal: 'ஈரப்பதம் மதிப்பீடு',
      description: 'Calculating moisture content from color',
      icon: <Sparkles className="w-5 h-5" />,
      complete: currentStage > 2,
    },
    {
      id: 'nutrients',
      name: 'Nutrient Analysis',
      nameLocal: 'ஊட்டச்சத்து பகுப்பாய்வு',
      description: 'Estimating NPK levels',
      icon: <Brain className="w-5 h-5" />,
      complete: currentStage > 3,
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const startAnalysis = () => {
    setStep('analyzing');
    setProgress(0);
    setCurrentStage(0);

    // Simulate AI analysis with progressive stages
    const stages = [0, 1, 2, 3, 4];
    let stageIndex = 0;

    const interval = setInterval(() => {
      if (stageIndex < stages.length) {
        setCurrentStage(stages[stageIndex]);
        setProgress((stageIndex / stages.length) * 100);
        stageIndex++;
      } else {
        clearInterval(interval);
        // Generate mock results
        const result: SoilData = {
          ph: 6.8,
          nitrogen: 75,
          phosphorus: 62,
          potassium: 58,
          moisture: 42,
          organicMatter: 3.2,
          texture: 'loamy',
          imageUrl: imageUrl || undefined,
        };
        setAnalysisResult(result);
        setSoilData(result);
        setStep('results');
      }
    }, 1500);
  };

  return (
    <MobileLayout gradient="earth">
      <Header 
        title="AI Soil Vision"
        subtitle="படம் மூலம் மண் பகுப்பாய்வு"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        {step === 'upload' && (
          <div className="animate-fade-in">
            {/* Upload Area */}
            <GlassCard className="mb-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt="Soil sample" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <Camera className="w-16 h-16 text-primary/50 mb-4" />
                    <p className="text-lg font-medium text-foreground">Tap to capture or upload</p>
                    <p className="text-sm text-muted-foreground">படத்தை எடுக்கவும்</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </GlassCard>

            {/* Instructions */}
            <GlassCard>
              <h3 className="font-semibold text-foreground mb-3">📸 Photo Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-leaf" />
                  Take photo in natural daylight
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-leaf" />
                  Capture soil from 6 inches above
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-leaf" />
                  Include some loose soil in frame
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-leaf" />
                  Avoid shadows on the soil
                </li>
              </ul>
            </GlassCard>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="animate-fade-in">
            {/* Preview */}
            {imageUrl && (
              <GlassCard className="mb-6">
                <div className="relative">
                  <img 
                    src={imageUrl} 
                    alt="Analyzing" 
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-xl flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Progress */}
            <GlassCard className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">{t.analyzing}</h3>
              <p className="text-sm text-muted-foreground mb-4">பகுப்பாய்வு செய்கிறது...</p>
              <ProgressBar value={progress} variant="primary" showLabel />
            </GlassCard>

            {/* Analysis Stages */}
            <div className="space-y-3">
              {analysisStages.map((stage, index) => (
                <GlassCard 
                  key={stage.id}
                  variant={currentStage === index ? 'highlight' : 'default'}
                  className={`transition-all ${currentStage > index ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stage.complete 
                        ? 'bg-leaf text-white' 
                        : currentStage === index 
                          ? 'bg-primary/10 text-primary animate-pulse' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {stage.complete ? <CheckCircle className="w-5 h-5" /> : stage.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{stage.name}</p>
                      <p className="text-xs text-muted-foreground">{stage.nameLocal}</p>
                    </div>
                    {currentStage === index && (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {step === 'results' && analysisResult && (
          <div className="animate-fade-in">
            {/* Success Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-leaf/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-leaf" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Analysis Complete!</h2>
              <p className="text-muted-foreground">பகுப்பாய்வு முடிந்தது!</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <GlassCard className="text-center">
                <p className="text-sm text-muted-foreground mb-1">pH Level</p>
                <p className="text-3xl font-bold text-foreground">{analysisResult.ph}</p>
                <p className="text-xs text-leaf">Optimal</p>
              </GlassCard>
              <GlassCard className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Moisture</p>
                <p className="text-3xl font-bold text-foreground">{analysisResult.moisture}%</p>
                <p className="text-xs text-water">Good</p>
              </GlassCard>
            </div>

            {/* NPK Levels */}
            <GlassCard className="mb-6">
              <h3 className="font-semibold text-foreground mb-4">Nutrient Levels (NPK)</h3>
              <div className="flex items-center justify-around">
                <CircularProgress 
                  value={analysisResult.nitrogen} 
                  variant="leaf" 
                  label="N" 
                  size={70}
                />
                <CircularProgress 
                  value={analysisResult.phosphorus} 
                  variant="harvest" 
                  label="P" 
                  size={70}
                />
                <CircularProgress 
                  value={analysisResult.potassium} 
                  variant="soil" 
                  label="K" 
                  size={70}
                />
              </div>
            </GlassCard>

            {/* AI Explanation */}
            <GlassCard variant="highlight">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Explanation
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🌱 <strong>மண் வகை:</strong> உங்கள் மண் களிமண் (Loamy) வகையாகும். இது விவசாயத்திற்கு மிகவும் ஏற்றது.</p>
                <p>💧 <strong>ஈரப்பதம்:</strong> 42% ஈரப்பதம் நல்ல நிலையில் உள்ளது.</p>
                <p>🧪 <strong>pH அளவு:</strong> 6.8 - சற்று அமிலத்தன்மை, பெரும்பாலான பயிர்களுக்கு ஏற்றது.</p>
              </div>
            </GlassCard>
          </div>
        )}
      </Content>

      <Footer>
        {step === 'upload' && (
          <Button 
            onClick={startAnalysis}
            disabled={!imageUrl}
            className="w-full"
            size="lg"
          >
            <Sparkles className="w-5 h-5" />
            Start AI Analysis
          </Button>
        )}
        {step === 'results' && (
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate('/soil/twin')}
              className="flex-1"
              size="lg"
            >
              View Soil Twin
            </Button>
            <Button 
              onClick={() => navigate('/recommendations')}
              className="flex-1"
              size="lg"
            >
              Get Recommendations
            </Button>
          </div>
        )}
      </Footer>
    </MobileLayout>
  );
}
