import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Beaker, Droplets, Leaf, FlaskConical } from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { useApp, useTranslation, SoilData } from '@/contexts/AppContext';

export default function SoilManualEntry() {
  const navigate = useNavigate();
  const { setSoilData } = useApp();
  const t = useTranslation();

  const [formData, setFormData] = useState<Partial<SoilData>>({
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    moisture: 40,
    organicMatter: 2.5,
    texture: 'loamy',
  });

  const handleChange = (field: keyof SoilData, value: number | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setSoilData(formData as SoilData);
    navigate('/recommendations');
  };

  const textures: { value: SoilData['texture']; label: string; emoji: string }[] = [
    { value: 'sandy', label: 'Sandy', emoji: '🏖️' },
    { value: 'loamy', label: 'Loamy', emoji: '🌱' },
    { value: 'clay', label: 'Clay', emoji: '🧱' },
    { value: 'silty', label: 'Silty', emoji: '💧' },
  ];

  return (
    <MobileLayout gradient="earth">
      <Header 
        title={t.manualEntry}
        subtitle="கைமுறை உள்ளீடு"
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content className="pb-24">
        <div className="space-y-4">
          {/* pH Level */}
          <GlassCard className="animate-slide-up">
            <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <Beaker className="w-4 h-4" />
              pH Level (0-14)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={formData.ph}
                onChange={(e) => handleChange('ph', parseFloat(e.target.value))}
                className="h-12 bg-muted/50 border-0 rounded-xl text-center text-xl font-bold"
              />
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                (formData.ph || 7) < 6 ? 'bg-harvest/10 text-harvest' :
                (formData.ph || 7) > 8 ? 'bg-water/10 text-water' :
                'bg-leaf/10 text-leaf'
              }`}>
                {(formData.ph || 7) < 6 ? 'Acidic' : (formData.ph || 7) > 8 ? 'Alkaline' : 'Optimal'}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="14"
              step="0.1"
              value={formData.ph}
              onChange={(e) => handleChange('ph', parseFloat(e.target.value))}
              className="w-full mt-3 accent-primary"
            />
          </GlassCard>

          {/* NPK Values */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '50ms' } as React.CSSProperties}>
            <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <FlaskConical className="w-4 h-4" />
              Nutrient Levels (NPK) %
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-center text-muted-foreground mb-1">Nitrogen (N)</p>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.nitrogen}
                  onChange={(e) => handleChange('nitrogen', parseInt(e.target.value))}
                  className="h-12 bg-leaf/10 border-0 rounded-xl text-center font-bold text-leaf"
                />
              </div>
              <div>
                <p className="text-xs text-center text-muted-foreground mb-1">Phosphorus (P)</p>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.phosphorus}
                  onChange={(e) => handleChange('phosphorus', parseInt(e.target.value))}
                  className="h-12 bg-harvest/10 border-0 rounded-xl text-center font-bold text-harvest"
                />
              </div>
              <div>
                <p className="text-xs text-center text-muted-foreground mb-1">Potassium (K)</p>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.potassium}
                  onChange={(e) => handleChange('potassium', parseInt(e.target.value))}
                  className="h-12 bg-soil/10 border-0 rounded-xl text-center font-bold text-soil"
                />
              </div>
            </div>
          </GlassCard>

          {/* Moisture */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
            <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <Droplets className="w-4 h-4" />
              Moisture Content (%)
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.moisture}
                onChange={(e) => handleChange('moisture', parseInt(e.target.value))}
                className="h-12 bg-muted/50 border-0 rounded-xl text-center text-xl font-bold flex-1"
              />
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <Droplets 
                    key={i} 
                    className={`w-5 h-5 ${
                      (formData.moisture || 0) >= i * 33 ? 'text-water' : 'text-muted'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.moisture}
              onChange={(e) => handleChange('moisture', parseInt(e.target.value))}
              className="w-full mt-3 accent-water"
            />
          </GlassCard>

          {/* Organic Matter */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '150ms' } as React.CSSProperties}>
            <Label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <Leaf className="w-4 h-4" />
              Organic Matter (%)
            </Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.organicMatter}
              onChange={(e) => handleChange('organicMatter', parseFloat(e.target.value))}
              className="h-12 bg-muted/50 border-0 rounded-xl text-center text-xl font-bold"
            />
          </GlassCard>

          {/* Soil Texture */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
            <Label className="text-sm font-medium text-muted-foreground mb-3 block">
              Soil Texture
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {textures.map((texture) => (
                <button
                  key={texture.value}
                  onClick={() => handleChange('texture', texture.value)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    formData.texture === texture.value
                      ? 'bg-primary text-primary-foreground shadow-button'
                      : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <span className="text-2xl">{texture.emoji}</span>
                  <p className="text-xs mt-1">{texture.label}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </Content>

      <Footer>
        <Button 
          onClick={handleSubmit}
          className="w-full"
          size="lg"
        >
          <Save className="w-5 h-5" />
          Save & Get Recommendations
        </Button>
      </Footer>
    </MobileLayout>
  );
}
