'use client';

import { useLang } from '@/lib/LangProvider';

const teachingRoles = [
  {
    id: 'uib',
    role: {
      en: 'Associate / Collaborating Professor',
      es: 'Profesor Asociado / Colaborador',
      ca: 'Professor Associat / Col·laborador',
    },
    institution: 'Universitat de les Illes Balears (UIB)',
    subject: {
      en: 'Biochemistry and Nutrition',
      es: 'Bioquímica y Nutrición',
      ca: 'Bioquímica i Nutrició',
    },
    description: {
      en: 'Teaching in the Faculty of Health Sciences, combining clinical pharmacy experience with academic education in biochemistry and nutrition for healthcare students.',
      es: 'Docencia en la Facultad de Ciencias de la Salud, combinando la experiencia en farmacia clínica con la formación académica en bioquímica y nutrición para estudiantes de ciencias de la salud.',
      ca: 'Docència a la Facultat de Ciències de la Salut, combinant l\'experiència en farmàcia clínica amb la formació acadèmica en bioquímica i nutrició per a estudiants de ciències de la salut.',
    },
    icon: '🎓',
  },
  {
    id: 'ub',
    role: {
      en: 'Associate / Collaborating Professor',
      es: 'Profesor Asociado / Colaborador',
      ca: 'Professor Associat / Col·laborador',
    },
    institution: 'Universitat de Barcelona (UB)',
    subject: {
      en: 'Faculty of Pharmacy and Food Sciences',
      es: 'Facultad de Farmacia y Ciencias de la Alimentación',
      ca: 'Facultat de Farmàcia i Ciències de l\'Alimentació',
    },
    description: {
      en: 'Academic collaboration in pharmacy education at one of the leading pharmacy faculties in Spain.',
      es: 'Colaboración académica en la formación farmacéutica en una de las facultades de farmacia de referencia en España.',
      ca: 'Col·laboració acadèmica en la formació farmacèutica en una de les facultats de farmàcia de referència a Espanya.',
    },
    icon: '🏛️',
  },
  {
    id: 'uah',
    role: {
      en: 'Scientific Coordinator',
      es: 'Coordinador Científico',
      ca: 'Coordinador Científic',
    },
    institution: 'Universidad de Alcalá',
    subject: {
      en: 'University Expert Diploma in Value-Based Healthcare for Dermatological and Rheumatic Diseases',
      es: 'Diploma de Experto Universitario en Atención Sanitaria Basada en Valor en Enfermedades Dermatológicas y Reumáticas',
      ca: 'Diploma d\'Expert Universitari en Atenció Sanitària Basada en Valor en Malalties Dermatològiques i Reumàtiques',
    },
    description: {
      en: 'Scientific coordinator of a postgraduate program accredited by SEFH, focused on implementing value-based healthcare models in dermatology and rheumatology using PROMs/PREMs.',
      es: 'Coordinador científico de un programa de posgrado acreditado por la SEFH, centrado en la implementación de modelos de atención sanitaria basada en valor en dermatología y reumatología mediante PROMs/PREMs.',
      ca: 'Coordinador científic d\'un programa de postgrau acreditat per la SEFH, centrat en la implementació de models d\'atenció sanitària basada en valor en dermatologia i reumatologia mitjançant PROMs/PREMs.',
    },
    icon: '🔬',
  },
];

export default function TeachingPage() {
  const { t, lang } = useLang();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-3">
          {t('teaching.title')}
        </h1>
        <p className="text-slate text-lg leading-relaxed max-w-3xl">
          {t('teaching.subtitle')}
        </p>
      </div>

      {/* Teaching roles */}
      <div className="space-y-6">
        {teachingRoles.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl border border-border-light p-6 sm:p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-navy/5 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h2 className="font-serif text-xl font-bold text-navy">
                    {item.role[lang]}
                  </h2>
                </div>
                <p className="text-gold font-semibold text-sm mb-1">
                  {item.institution}
                </p>
                <p className="text-navy/70 font-medium text-sm mb-3">
                  {item.subject[lang]}
                </p>
                <p className="text-slate text-sm leading-relaxed">
                  {item.description[lang]}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
