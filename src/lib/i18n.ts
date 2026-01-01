import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      seo: {
        defaultTitle: 'Voither | Ambient-Agentic Clinical Intelligence',
        defaultDescription: 'Transforming healthcare with AACI Engine. Ambient documentation, intelligent triage, and predictive analytics.',
        medscribe: 'MedScribe Demo | Voither Healthcare AI',
        sortio: 'Sortio Triage Demo | Voither Healthcare AI',
        clinic: 'CloudClinic Platform Demo | Voither Healthcare AI',
        analytics: 'CHM Analytics Insights | Voither Healthcare AI'
      },
      nav: { start: 'Get Started', features: 'Features', products: 'Suite', contact: 'Contact' },
      hero: { title: 'Ambient Intelligence for Modern Healthcare', subtitle: 'AACI Engine: Generating documentation, diagnoses, and analytics in real-time.' },
      stats: { patient: '98% Patient Satisfaction', clinical: '60% Less Documentation Time', triage: 'Real-time Triage', growth: '40% Efficiency Increase' },
      engine: { title: 'The AACI Engine', desc: 'Real-time ambient documentation and agentic clinical logic.' },
      barriers: { title: 'Quality Barriers', desc: 'Zero-hallucination protocols with VoyageAI embeddings and Claude 3.5 validation.' },
      suite: { medscribe: 'MedScribe', sortio: 'Sortio', clinic: 'CloudClinic', analytics: 'CHM Analytics' },
      contact: {
        title: 'Request a Platform Demo',
        subtitle: 'Experience the AACI Engine within your clinical organization.',
        name: 'Full Name',
        org: 'Clinical Organization',
        email: 'Medical Email Address',
        submit: 'Request Access',
        sending: 'Processing Request...',
        successTitle: 'Request Received',
        successMessage: 'Our clinical integration team will contact you within 24 hours.',
        back: 'Send another request'
      },
      gamification: {
        xp: 'XP',
        level: 'Level',
        pointsEarned: 'Points Earned',
        levelUp: 'Clinical Level Up!',
        bonus_reason: 'Excellence Bonus',
        titles: {
          intern: 'Medical Intern',
          resident: 'Clinical Resident',
          specialist: 'Healthcare Specialist',
          attending: 'Attending Physician',
          chief_medical_officer: 'Chief Medical Officer'
        }
      },
      partners: { title: 'Our Innovation Network' },
      demos: {
        medscribe: {
          title: 'MedScribe Documentation',
          start: 'Start Ambient Scribe',
          stop: 'Stop Intake',
          output: 'Documentation Output',
          generate: 'Generate SOAP Note',
          placeholder: 'Press start to begin clinical transcription...'
        },
        sortio: {
          title: 'Sortio Triage',
          subtitle: 'Emergency Queue Simulation',
          desc: 'Click \'AI Triage\' to process patient symptoms through AACI agentic logic.',
          analyze: 'AI Triage',
          analyzing: 'Analyzing...',
          priority: 'Priority',
          verified: 'Zero-Hallucination Verified'
        },
        clinic: {
          title: 'CloudClinic Platform',
          ehr: 'Patient EHR Live',
          live: 'Live Ambient Stream',
          history: 'Medical History',
          status: 'Synthesizing ambient consult data into population health record...',
          history_unlocked: 'Medical records retrieved from AACI secure cloud.'
        },
        analytics: {
          title: 'CHM Analytics',
          subtitle: 'Health Intelligence Dashboard',
          desc: 'Predictive clinical metrics driven by the AACI Engine.',
          export: 'Export Insights',
          efficiency: 'Documentation Time (Minutes)',
          risk: 'Population Risk Distribution',
          insight: 'Based on documentation efficiency trends, switching to full ambient documentation could recover approximately 14 hours of clinical face-time per week.',
          insights_exported: 'Population health report generated and clinical insights shared.'
        }
      },
      footer: { note: 'Limited AI requests across all user apps.' }
    }
  },
  pt: {
    translation: {
      seo: {
        defaultTitle: 'Voither | Inteligência Clínica Ambient-Agentic',
        defaultDescription: 'Transformando a saúde com o Motor AACI. Documentação ambiental, triagem inteligente e análises preditivas.',
        medscribe: 'Demo MedScribe | Voither Healthcare AI',
        sortio: 'Demo Triagem Sortio | Voither Healthcare AI',
        clinic: 'Demo Plataforma CloudClinic | Voither Healthcare AI',
        analytics: 'Demo Insights CHM Analytics | Voither Healthcare AI'
      },
      nav: { start: 'Começar', features: 'Funcionalidades', products: 'Produtos', contact: 'Contato' },
      hero: { title: 'Inteligência Ambiental para Saúde Moderna', subtitle: 'Motor AACI: Gerando documentação, diagnósticos e análises em tempo real.' },
      stats: { patient: '98% Satisfação do Paciente', clinical: '60% Menos Tempo de Escrita', triage: 'Triagem em Tempo Real', growth: '40% Aumento de Eficiência' },
      engine: { title: 'O Motor AACI', desc: 'Documentação ambiental e lógica clínica agentica em tempo real.' },
      barriers: { title: 'Barreiras de Qualidade', desc: 'Protocolos de zero alucinação com embeddings VoyageAI e validação Claude 3.5.' },
      suite: { medscribe: 'MedScribe', sortio: 'Sortio', clinic: 'CloudClinic', analytics: 'Análise CHM' },
      contact: {
        title: 'Solicitar Demonstração',
        subtitle: 'Experimente o Motor AACI dentro da sua organização clínica.',
        name: 'Nome Completo',
        org: 'Organização Clínica',
        email: 'E-mail Profissional',
        submit: 'Solicitar Acesso',
        sending: 'Processando Solicitação...',
        successTitle: 'Solicitação Recebida',
        successMessage: 'Nossa equipe de integração clínica entrará em contato em até 24 horas.',
        back: 'Enviar outra solicitação'
      },
      gamification: {
        xp: 'XP',
        level: 'Nível',
        pointsEarned: 'Pontos Ganhos',
        levelUp: 'Aumento de Nível Clínico!',
        bonus_reason: 'Bônus de Excelência',
        titles: {
          intern: 'Interno Médico',
          resident: 'Residente Clínico',
          specialist: 'Especialista em Saúde',
          attending: 'Médico Assistente',
          chief_medical_officer: 'Diretor Médico'
        }
      },
      partners: { title: 'Nossa Rede de Inovação' },
      demos: {
        medscribe: {
          title: 'Documentação MedScribe',
          start: 'Iniciar Escriba Ambiental',
          stop: 'Parar Captação',
          output: 'Resultado da Documentação',
          generate: 'Gerar Nota SOAP',
          placeholder: 'Pressione iniciar para começar a transcrição clínica...'
        },
        sortio: {
          title: 'Triagem Sortio',
          subtitle: 'Simulação de Fila de Emergência',
          desc: 'Clique em \'Triagem IA\' para processar os sintomas através da lógica agentica AACI.',
          analyze: 'Triagem IA',
          analyzing: 'Analisando...',
          priority: 'Prioridade',
          verified: 'Verificação Anti-Alucinação'
        },
        clinic: {
          title: 'Plataforma CloudClinic',
          ehr: 'Prontuário Eletrônico ao Vivo',
          live: 'Streaming Ambiental Ativo',
          history: 'Histórico Médico',
          status: 'Sintetizando dados de consulta ambiental em registro de saúde populacional...',
          history_unlocked: 'Registros médicos recuperados da nuvem segura AACI.'
        },
        analytics: {
          title: 'Análise CHM',
          subtitle: 'Painel de Inteligência em Saúde',
          desc: 'Métricas clínicas preditivas impulsionadas pelo Motor AACI.',
          export: 'Exportar Insights',
          efficiency: 'Tempo de Documentação (Minutos)',
          risk: 'Distribuição de Risco Populacional',
          insight: 'Com base nas tendências de eficiência de documentação, a mudança para documentação ambiental completa poderia recuperar aproximadamente 14 horas de atendimento clínico por semana.',
          insights_exported: 'Relatório de saúde populacional gerado e insights clínicos compartilhados.'
        }
      },
      footer: { note: 'Limite de requisições de IA aplicado em todas as aplicações de usuários.' }
    }
  }
};
const i18n = i18next.createInstance();
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lng') || (navigator.language.startsWith('pt') ? 'pt' : 'en'),
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
export default i18n;