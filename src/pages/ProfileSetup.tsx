import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Phone, Ruler, ChevronRight } from 'lucide-react';
import { MobileLayout, Header, Content, Footer } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { useApp, useTranslation, FarmerProfile } from '@/contexts/AppContext';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { setFarmerProfile } = useApp();
  const t = useTranslation();

  const [formData, setFormData] = useState<FarmerProfile>({
    name: '',
    village: '',
    district: '',
    state: 'Tamil Nadu',
    landSize: 0,
    landUnit: 'acres',
    phone: '',
  });

  const handleChange = (field: keyof FarmerProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setFarmerProfile(formData);
    navigate('/dashboard');
  };

  const isValid = formData.name && formData.village && formData.landSize > 0;

  return (
    <MobileLayout gradient="sunrise">
      <Header 
        title={t.profile}
        leftAction={
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        }
      />
      
      <Content>
        {/* Avatar Section */}
        <div className="flex justify-center mb-6 animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '0ms' } as React.CSSProperties}>
            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground mb-2 block">
              {t.name}
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                className="pl-10 h-12 bg-muted/50 border-0 rounded-xl"
              />
            </div>
          </GlassCard>

          {/* Village & District */}
          <div className="grid grid-cols-2 gap-3">
            <GlassCard className="animate-slide-up" style={{ animationDelay: '50ms' } as React.CSSProperties}>
              <Label htmlFor="village" className="text-sm font-medium text-muted-foreground mb-2 block">
                {t.village}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="village"
                  value={formData.village}
                  onChange={(e) => handleChange('village', e.target.value)}
                  placeholder="Village"
                  className="pl-9 h-11 bg-muted/50 border-0 rounded-xl text-sm"
                />
              </div>
            </GlassCard>

            <GlassCard className="animate-slide-up" style={{ animationDelay: '100ms' } as React.CSSProperties}>
              <Label htmlFor="district" className="text-sm font-medium text-muted-foreground mb-2 block">
                {t.district}
              </Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                placeholder="District"
                className="h-11 bg-muted/50 border-0 rounded-xl text-sm"
              />
            </GlassCard>
          </div>

          {/* State */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '150ms' } as React.CSSProperties}>
            <Label htmlFor="state" className="text-sm font-medium text-muted-foreground mb-2 block">
              {t.state}
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="State"
              className="h-12 bg-muted/50 border-0 rounded-xl"
            />
          </GlassCard>

          {/* Land Size */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
            <Label htmlFor="landSize" className="text-sm font-medium text-muted-foreground mb-2 block">
              {t.landSize}
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="landSize"
                  type="number"
                  value={formData.landSize || ''}
                  onChange={(e) => handleChange('landSize', parseFloat(e.target.value) || 0)}
                  placeholder="Size"
                  className="pl-10 h-12 bg-muted/50 border-0 rounded-xl"
                />
              </div>
              <div className="flex rounded-xl overflow-hidden bg-muted/50">
                <button
                  onClick={() => handleChange('landUnit', 'acres')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    formData.landUnit === 'acres' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Acres
                </button>
                <button
                  onClick={() => handleChange('landUnit', 'hectares')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    formData.landUnit === 'hectares' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Ha
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Phone */}
          <GlassCard className="animate-slide-up" style={{ animationDelay: '250ms' } as React.CSSProperties}>
            <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground mb-2 block">
              {t.phone}
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 9876543210"
                className="pl-10 h-12 bg-muted/50 border-0 rounded-xl"
              />
            </div>
          </GlassCard>
        </div>
      </Content>

      <Footer>
        <Button 
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
          size="lg"
        >
          {t.save}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </Footer>
    </MobileLayout>
  );
}
