import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi';

export interface FarmerProfile {
  name: string;
  village: string;
  district: string;
  state: string;
  landSize: number;
  landUnit: 'acres' | 'hectares';
  phone: string;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  organicMatter: number;
  texture: 'sandy' | 'loamy' | 'clay' | 'silty';
  imageUrl?: string;
}

export interface CropRecommendation {
  name: string;
  nameLocal: string;
  confidence: number;
  season: string;
  duration: string;
  waterNeed: 'low' | 'medium' | 'high';
  riskLevel: 'low' | 'medium' | 'high';
  expectedYield: string;
  marketPrice: string;
  reasoning: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameLocal: string;
  description: string;
  eligibility: string[];
  benefits: string;
  deadline?: string;
  matchScore: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  farmerProfile: FarmerProfile | null;
  setFarmerProfile: (profile: FarmerProfile) => void;
  soilData: SoilData | null;
  setSoilData: (data: SoilData) => void;
  recommendations: CropRecommendation[];
  setRecommendations: (recs: CropRecommendation[]) => void;
  schemes: GovernmentScheme[];
  setSchemes: (schemes: GovernmentScheme[]) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const translations = {
  en: {
    welcome: "Welcome",
    selectLanguage: "Select Your Language",
    continue: "Continue",
    profile: "Farmer Profile",
    name: "Name",
    village: "Village",
    district: "District",
    state: "State",
    landSize: "Land Size",
    phone: "Phone Number",
    save: "Save Profile",
    soilAnalysis: "Soil Analysis",
    manualEntry: "Manual Entry",
    uploadImage: "Upload Image",
    voiceInput: "Voice Input",
    analyzing: "Analyzing...",
    recommendations: "Crop Recommendations",
    schemes: "Government Schemes",
    dashboard: "Dashboard",
    climate: "Climate Intelligence",
    offline: "Offline Mode",
    sync: "Sync Data",
    help: "Help",
    assistant: "AI Assistant",
    soilHealth: "Soil Health",
    moisture: "Moisture",
    nutrients: "Nutrients",
    riskLevel: "Risk Level",
    confidence: "Confidence",
    eligibility: "Eligibility",
    benefits: "Benefits",
    apply: "Apply Now",
    back: "Back",
    next: "Next",
    finish: "Finish",
    skip: "Skip",
  },
  ta: {
    welcome: "வரவேற்கிறோம்",
    selectLanguage: "உங்கள் மொழியை தேர்வு செய்யவும்",
    continue: "தொடரவும்",
    profile: "விவசாயி சுயவிவரம்",
    name: "பெயர்",
    village: "கிராமம்",
    district: "மாவட்டம்",
    state: "மாநிலம்",
    landSize: "நிலத்தின் அளவு",
    phone: "தொலைபேசி எண்",
    save: "சுயவிவரத்தை சேமிக்கவும்",
    soilAnalysis: "மண் பகுப்பாய்வு",
    manualEntry: "கைமுறை உள்ளீடு",
    uploadImage: "படத்தை பதிவேற்றம் செய்யவும்",
    voiceInput: "குரல் உள்ளீடு",
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    recommendations: "பயிர் பரிந்துரைகள்",
    schemes: "அரசு திட்டங்கள்",
    dashboard: "டாஷ்போர்டு",
    climate: "காலநிலை நுண்ணறிவு",
    offline: "ஆஃப்லைன் பயன்முறை",
    sync: "தரவை ஒத்திசைக்கவும்",
    help: "உதவி",
    assistant: "AI உதவியாளர்",
    soilHealth: "மண் ஆரோக்கியம்",
    moisture: "ஈரப்பதம்",
    nutrients: "ஊட்டச்சத்துக்கள்",
    riskLevel: "ஆபத்து நிலை",
    confidence: "நம்பிக்கை",
    eligibility: "தகுதி",
    benefits: "நன்மைகள்",
    apply: "இப்போது விண்ணப்பிக்கவும்",
    back: "பின்செல்",
    next: "அடுத்து",
    finish: "முடி",
    skip: "தவிர்க்க",
  },
  hi: {
    welcome: "स्वागत है",
    selectLanguage: "अपनी भाषा चुनें",
    continue: "जारी रखें",
    profile: "किसान प्रोफाइल",
    name: "नाम",
    village: "गाँव",
    district: "जिला",
    state: "राज्य",
    landSize: "भूमि का आकार",
    phone: "फोन नंबर",
    save: "प्रोफाइल सेव करें",
    soilAnalysis: "मिट्टी विश्लेषण",
    manualEntry: "मैन्युअल एंट्री",
    uploadImage: "छवि अपलोड करें",
    voiceInput: "वॉयस इनपुट",
    analyzing: "विश्लेषण हो रहा है...",
    recommendations: "फसल सिफारिशें",
    schemes: "सरकारी योजनाएं",
    dashboard: "डैशबोर्ड",
    climate: "जलवायु जानकारी",
    offline: "ऑफलाइन मोड",
    sync: "डेटा सिंक करें",
    help: "मदद",
    assistant: "AI सहायक",
    soilHealth: "मिट्टी स्वास्थ्य",
    moisture: "नमी",
    nutrients: "पोषक तत्व",
    riskLevel: "जोखिम स्तर",
    confidence: "विश्वास",
    eligibility: "पात्रता",
    benefits: "लाभ",
    apply: "अभी आवेदन करें",
    back: "वापस",
    next: "आगे",
    finish: "समाप्त",
    skip: "छोड़ें",
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        farmerProfile,
        setFarmerProfile,
        soilData,
        setSoilData,
        recommendations,
        setRecommendations,
        schemes,
        setSchemes,
        isOnline,
        setIsOnline,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function useTranslation() {
  const { language } = useApp();
  return translations[language];
}
