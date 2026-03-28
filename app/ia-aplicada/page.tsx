'use client';

import { useLang } from '@/lib/LangProvider';

export default function IAPage() {
  const { t } = useLang();

  const projects = [
    {
      id: 'tutor-asbv',
      icon: '🎓',
      title: t('ia.tutor.title'),
      subtitle: t('ia.tutor.subtitle'),
      description: t('ia.tutor.description'),
      tags: ['LLM', 'Flowise', 'PROMs', 'VBHC', 'DEU'],
      status: t('ia.status.active'),
      statusColor: 'bg-emerald-100 text-emerald-800',
      link: '/tutor_deu.html',
      linkLabel: t('ia.tutor.cta'),
      external: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2348] via-[#1a3a6e] to-[#0d47a1] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🤖</span>
            <h1 className="text-4xl font-bold font-serif">{t('ia.page.title')}</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            {t('ia.page.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['IA Clínica', 'LLM', 'PROMs/PREMs', 'VBHC', 'eHealth', 'IB-SALUT'].map(tag => (
              <span key={tag} className="bg-white/15 text-white/90 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-[#0d2348] mb-8 font-serif">{t('ia.section.projects')}</h2>
        <div className="grid gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-[#0d2348]">{project.title}</h3>
                      <p className="text-sm text-gray-500">{project.subtitle}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 bg-[#0d2348] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a3a6e] transition-colors"
                  >
                    {project.linkLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-12 text-center border-2 border-dashed border-gray-200 rounded-2xl p-8">
          <p className="text-lg font-semibold text-gray-400">{t('ia.section.coming')}</p>
          <p className="text-sm text-gray-400 mt-1">{t('ia.section.comingSub')}</p>
        </div>
      </section>
    </main>
  );
}
