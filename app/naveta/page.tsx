'use client';

import { useLang } from '@/lib/LangProvider';

const areas = [
  'Psoriasis / Atopic dermatitis',
  'HIV pharmaceutical care',
  'Inflammatory bowel disease',
  'Rheumatoid arthritis',
  'Multiple sclerosis',
  'Migraine',
  'Ophthalmology (DME, AMD)',
  'Obesity',
  'Oncology',
];

const awards = [
  { name: 'SEFH Innovation Award 2021', desc: 'Best telepharmacy innovation project' },
  { name: 'AMPHOS Pharmacy Award 2022', desc: 'Best hospital pharmacy management experience' },
  { name: 'SEFH/CSL Vifor 1st Prize 2025', desc: 'Quality of Pharmacy Services (ZAFIRO, derived from NAVETA)' },
  { name: 'Creasphere Spain by Roche 2024', desc: 'Digital health startup programme grant' },
  { name: 'Visionarium Innovation by Gilead 2025', desc: 'IA-PROM-VIH, AI-based PROMs analysis for HIV' },
];

const keyPubs = [
  { title: 'Implementing Systematic Patient-Reported Measures Through the Naveta Value-Based Telemedicine Initiative', journal: 'JMIR Mhealth Uhealth. 2024;12:e56196' },
  { title: 'Person-centred coordinated care experience measured by the P3CEQ', journal: 'Health Serv Insights. 2024;13:11786329241258856' },
  { title: 'TELEPROM Psoriasis: Enhancing patient-centered care and HRQoL', journal: 'Front Med (Lausanne). 2024;11:1465725' },
  { title: 'Developing a Prototype Machine Learning Model to Predict QoL in People Living With HIV', journal: 'Integr Pharm Res Pract. 2025;14:1-16' },
];

export default function NavetaPage() {
  const { t } = useLang();

  return (
    <>
      <div className="mb-10">
        <p className="text-sm font-medium tracking-widest uppercase text-gold mb-2">{t('naveta.featured')}</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">{t('naveta.title')}</h1>
        <p className="text-lg text-slate leading-relaxed max-w-3xl mb-6">{t('naveta.description')}</p>
        <a href="https://www.farupeib.com/es/proyecto-naveta" target="_blank" rel="noopener noreferrer" className="profile-link-accent">
          {t('naveta.visit')} {'\u2192'}
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-navy mb-3">{t('naveta.objectives')}</h2>
          <ul className="space-y-2 text-sm text-slate list-none p-0">
            <li>{t('naveta.obj1')}</li>
            <li>{t('naveta.obj2')}</li>
            <li>{t('naveta.obj3')}</li>
            <li>{t('naveta.obj4')}</li>
            <li>{t('naveta.obj5')}</li>
          </ul>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-navy mb-3">{t('naveta.areas')}</h2>
          <ul className="space-y-2 text-sm text-slate list-none p-0">
            {areas.map((a) => (<li key={a}>{a}</li>))}
          </ul>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 mb-12">
        <h2 className="font-serif text-xl font-bold text-navy mb-3">{t('naveta.awards')}</h2>
        <div className="space-y-3 text-sm text-slate">
          {awards.map((aw) => (
            <p key={aw.name}><span className="font-semibold text-navy">{aw.name}</span> - {aw.desc}</p>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h2 className="font-serif text-xl font-bold text-navy mb-3">{t('naveta.keyPubs')}</h2>
        <div className="space-y-4 text-sm">
          {keyPubs.map((kp) => (
            <div key={kp.title}>
              <p className="font-semibold text-navy">{kp.title}</p>
              <p className="text-slate italic">{kp.journal}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
