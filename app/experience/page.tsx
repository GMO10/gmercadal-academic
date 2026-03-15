'use client';

import { useLang } from '@/lib/LangProvider';

const experiences = [
  {
    id: 'fir',
    role: {
      en: 'Resident Pharmacist (FIR)',
      es: 'Farmacéutico Interno Residente (FIR)',
      ca: 'Farmacèutic Intern Resident (FIR)',
    },
    institution: 'Hospital Universitari de Bellvitge',
    location: 'L\'Hospitalet de Llobregat, Barcelona',
    period: '2002 – 2006',
    description: {
      en: 'Specialist training in Hospital Pharmacy (FEA) at one of the leading university hospitals in Catalonia.',
      es: 'Formación especializada en Farmacia Hospitalaria (FEA) en uno de los hospitales universitarios de referencia en Cataluña.',
      ca: 'Formació especialitzada en Farmàcia Hospitalària (FEA) en un dels hospitals universitaris de referència a Catalunya.',
    },
    type: 'training',
  },
  {
    id: 'hgc',
    role: {
      en: 'Hospital Pharmacist',
      es: 'Farmacéutico de Hospital',
      ca: 'Farmacèutic d\'Hospital',
    },
    institution: 'Hospital General de Catalunya',
    location: 'Sant Cugat del Vallès, Barcelona',
    period: '',
    description: {
      en: 'Clinical pharmacy services at a general hospital in the Barcelona metropolitan area.',
      es: 'Servicios de farmacia clínica en un hospital general del área metropolitana de Barcelona.',
      ca: 'Serveis de farmàcia clínica en un hospital general de l\'àrea metropolitana de Barcelona.',
    },
    type: 'work',
  },
  {
    id: 'sjd',
    role: {
      en: 'Hospital Pharmacist',
      es: 'Farmacéutico de Hospital',
      ca: 'Farmacèutic d\'Hospital',
    },
    institution: 'Hospital Pediàtric Sant Joan de Déu',
    location: 'Barcelona',
    period: '',
    description: {
      en: 'Paediatric hospital pharmacy at one of the leading children\'s hospitals in Europe.',
      es: 'Farmacia hospitalaria pediátrica en uno de los hospitales infantiles de referencia en Europa.',
      ca: 'Farmàcia hospitalària pediàtrica en un dels hospitals infantils de referència a Europa.',
    },
    type: 'work',
  },
  {
    id: 'ico',
    role: {
      en: 'Hospital Pharmacist',
      es: 'Farmacéutico de Hospital',
      ca: 'Farmacèutic d\'Hospital',
    },
    institution: 'Hospital Oncològic Duran i Reynals (ICO)',
    location: 'L\'Hospitalet de Llobregat, Barcelona',
    period: '',
    description: {
      en: 'Oncology pharmacy at the Catalan Institute of Oncology, specialising in chemotherapy and supportive care.',
      es: 'Farmacia oncológica en el Institut Català d\'Oncologia, especializada en quimioterapia y cuidados de soporte.',
      ca: 'Farmàcia oncològica a l\'Institut Català d\'Oncologia, especialitzada en quimioteràpia i cures de suport.',
    },
    type: 'work',
  },
  {
    id: 'igualada',
    role: {
      en: 'Hospital Pharmacist',
      es: 'Farmacéutico de Hospital',
      ca: 'Farmacèutic d\'Hospital',
    },
    institution: 'Hospital d\'Igualada',
    location: 'Igualada, Barcelona',
    period: '',
    description: {
      en: 'Hospital pharmacy services at a county hospital in central Catalonia.',
      es: 'Servicios de farmacia hospitalaria en un hospital comarcal de la Cataluña central.',
      ca: 'Serveis de farmàcia hospitalària en un hospital comarcal de la Catalunya central.',
    },
    type: 'work',
  },
  {
    id: 'juaneda',
    role: {
      en: 'Hospital Pharmacist',
      es: 'Farmacéutico de Hospital',
      ca: 'Farmacèutic d\'Hospital',
    },
    institution: 'Hospital Juaneda',
    location: 'Menorca',
    period: '',
    description: {
      en: 'Hospital pharmacy in a private healthcare facility in Menorca.',
      es: 'Farmacia hospitalaria en un centro sanitario privado en Menorca.',
      ca: 'Farmàcia hospitalària en un centre sanitari privat a Menorca.',
    },
    type: 'work',
  },
  {
    id: 'hmo',
    role: {
      en: 'Hospital Pharmacist — Outpatient Care',
      es: 'Farmacéutico de Hospital — Pacientes Externos',
      ca: 'Farmacèutic d\'Hospital — Pacients Externs',
    },
    institution: 'Hospital Mateu Orfila',
    location: 'Menorca, IB-SALUT',
    period: {
      en: 'Current position',
      es: 'Posición actual',
      ca: 'Posició actual',
    },
    description: {
      en: 'Clinical pharmacy focused on outpatient care, leading research in value-based healthcare, telepharmacy with ePROMs/PREMs, and AI applied to eHealth. Creator of the NAVETA platform.',
      es: 'Farmacia clínica centrada en pacientes externos, liderando investigación en asistencia sanitaria basada en valor, telefarmacia con ePROMs/PREMs e IA aplicada a eHealth. Creador de la plataforma NAVETA.',
      ca: 'Farmàcia clínica centrada en pacients externs, liderant investigació en assistència sanitària basada en valor, telefarmàcia amb ePROMs/PREMs i IA aplicada a eHealth. Creador de la plataforma NAVETA.',
    },
    type: 'current',
  },
];

const institutionalRoles = [
  {
    role: {
      en: 'SEFH Regional Representative (Balearic Islands)',
      es: 'Vocal de la SEFH en Baleares',
      ca: 'Vocal de la SEFH a Balears',
    },
    institution: 'Sociedad Española de Farmacia Hospitalaria (SEFH)',
  },
  {
    role: {
      en: 'President',
      es: 'Presidente',
      ca: 'President',
    },
    institution: 'FARUPEIB',
  },
  {
    role: {
      en: 'Chair, Pharmacy/Pharmacology Section',
      es: 'Presidente, Sección de Farmacia/Farmacología',
      ca: 'President, Secció de Farmàcia/Farmacologia',
    },
    institution: 'Acadèmia Mèdica Balear',
  },
];

export default function ExperiencePage() {
  const { t, lang } = useLang();

  // Reverse to show current first
  const sortedExperiences = [...experiences].reverse();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-3">
          {t('experience.title')}
        </h1>
        <p className="text-slate text-lg leading-relaxed max-w-3xl">
          {t('experience.subtitle')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-light hidden sm:block" />

        <div className="space-y-6">
          {sortedExperiences.map((item) => {
            const isCurrent = item.type === 'current';
            const isTraining = item.type === 'training';
            const period = typeof item.period === 'object' ? item.period[lang] : item.period;

            return (
              <article
                key={item.id}
                className={`relative sm:pl-16 ${isCurrent ? '' : ''}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-5 h-5 rounded-full border-2 hidden sm:block ${
                  isCurrent
                    ? 'bg-gold border-gold shadow-md shadow-gold/30'
                    : isTraining
                    ? 'bg-navy/20 border-navy/40'
                    : 'bg-white border-border-light'
                }`} />

                <div className={`rounded-xl border p-6 sm:p-7 transition-shadow hover:shadow-lg ${
                  isCurrent
                    ? 'border-gold/30 bg-gradient-to-r from-gold/5 to-transparent'
                    : 'border-border-light bg-white'
                }`}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h2 className="font-serif text-lg font-bold text-navy">
                      {item.role[lang]}
                    </h2>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold px-2 py-0.5 rounded-full">
                        {lang === 'ca' ? 'Actual' : lang === 'es' ? 'Actual' : 'Current'}
                      </span>
                    )}
                    {isTraining && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-navy/10 text-navy/60 px-2 py-0.5 rounded-full">
                        FIR
                      </span>
                    )}
                  </div>
                  <p className="text-gold font-semibold text-sm mb-0.5">
                    {item.institution}
                  </p>
                  <p className="text-slate text-xs mb-2">
                    {item.location}
                    {period && <> · {period}</>}
                  </p>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Cargos institucionales */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-navy mb-6">
          {t('experience.roles')}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {institutionalRoles.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-border-light p-5 text-center hover:shadow-lg transition-shadow">
              <p className="font-semibold text-navy text-sm mb-1">{item.role[lang]}</p>
              <p className="text-gold text-xs font-medium">{item.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
