import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      nav: { start: 'Get Started', features: 'Features', products: 'Suite' },
      hero: { title: 'Ambient Intelligence for Modern Healthcare', subtitle: 'AACI Engine: Generating documentation, diagnoses, and analytics in real-time.' },
      stats: { patient: '98% Patient Satisfaction', clinical: '60% Less Documentation Time', triage: 'Real-time Triage', growth: '40% Efficiency Increase' },
      engine: { title: 'The AACI Engine', desc: 'Real-time ambient documentation and agentic clinical logic.' },
      barriers: { title: 'Quality Barriers', desc: 'Zero-hallucination protocols with VoyageAI embeddings and Claude 3.5 validation.' },
      suite: { medscribe: 'MedScribe', sortio: 'Sortio', clinic: 'CloudClinic', analytics: 'CHM Analytics' },
      footer: { note: 'Limited AI requests across all user apps.' }
    }
  },
  pt: {
    translation: {
      nav: { start: 'Começar', features: 'Funcionalidades', products: 'Produtos' },
      hero: { title: 'Inteligência Ambiental para Saúde Moderna', subtitle: 'Motor AACI: Gerando documentação, diagnósticos e análises em tempo real.' },
      stats: { patient: '98% Satisfação do Paciente', clinical: '60% Menos Tempo de Escrita', triage: 'Triagem em Tempo Real', growth: '40% Aumento de Eficiência' },
      engine: { title: 'O Motor AACI', desc: 'Documentação ambiental e lógica clínica agentica em tempo real.' },
      barriers: { title: 'Barreiras de Qualidade', desc: 'Protocolos de zero alucinação com embeddings VoyageAI e validação Claude 3.5.' },
      suite: { medscribe: 'MedScribe', sortio: 'Sortio', clinic: 'CloudClinic', analytics: 'Análise CHM' },
      footer: { note: 'Limite de requisições de IA aplicado em todas as aplicações de usuários.' }
    }
  }
};
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lng') || 'pt',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});
export default i18n;