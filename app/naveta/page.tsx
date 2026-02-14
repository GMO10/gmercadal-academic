import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NAVETA Project',
  description: 'NAVETA: Value-based telemedicine initiative for patient-reported outcomes in hospital pharmacy.',
};

export default function NavetaPage() {
  return (
    <>
      <div className="mb-10">
        <p className="text-sm font-medium tracking-widest uppercase text-gold mb-2">
          Featured Project
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
          Proyecto NAVETA
        </h1>
        <p className="text-lg text-slate leading-relaxed max-w-3xl mb-6">
          A value-based telemedicine platform integrating Patient-Reported Outcome Measures
          (PROMs) and Patient-Reported Experience Measures (PREMs) into routine hospital
          pharmacy care. NAVETA enables systematic, real-time monitoring of health-related
          quality of life across chronic conditions.
        </p>
        
          href="https://www.farupeib.com/es/proyecto-naveta"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link-accent"
        >
          Visit NAVETA at FARUPEIB &rarr;
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-navy mb-3">Objectives</h2>
          <ul className="space-y-2 text-sm text-slate list-none p-0">
            <li>Implement systematic PROMs/PREMs collection via telepharmacy</li>
            <li>Enable value-based pharmaceutical care for chronic patients</li>
            <li>Monitor health-related quality of life in real time</li>
            <li>Apply machine learning for outcome prediction</li>
            <li>Reduce unnecessary hospital visits through telemedicine</li>
          </ul>
        </div>
        <div className="border border-border rounded-lg p-6">
          <h2 className="font-serif text-xl font-bold text-navy mb-3">Therapeutic Areas</h2>
          <ul className="space-y-2 text-sm text-slate list-none p-0">
            <li>Psoriasis and atopic dermatitis</li>
            <li>HIV pharmaceutical care</li>
            <li>Inflammatory bowel disease</li>
            <li>Rheumatoid arthritis</li>
            <li>Multiple sclerosis</li>
            <li>Migraine</li>
            <li>Ophthalmology (DME, AMD)</li>
            <li>Obesity</li>
            <li>Oncology</li>
          </ul>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 mb-12">
        <h2 className="font-serif text-xl font-bold text-navy mb-3">Awards</h2>
        <div className="space-y-3 text-sm text-slate">
          <p><span className="font-semibold text-navy">SEFH Innovation Award 2021</span> &mdash; Best telepharmacy innovation project</p>
          <p><span className="font-semibold text-navy">AMPHOS Pharmacy Award 2022</span> &mdash; Best hospital pharmacy management experience</p>
          <p><span className="font-semibold text-navy">SEFH/CSL Vifor 1st Prize 2025</span> &mdash; Quality of Pharmacy Services (ZAFIRO, derived from NAVETA)</p>
          <p><span className="font-semibold text-navy">Creasphere Spain by Roche 2024</span> &mdash; Digital health startup programme grant</p>
          <p><span className="font-semibold text-navy">Visionarium Innovation by Gilead 2025</span> &mdash; IA-PROM-VIH, AI-based PROMs analysis for HIV</p>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h2 className="font-serif text-xl font-bold text-navy mb-3">Key Publications</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold text-navy">Implementing Systematic Patient-Reported Measures Through the Naveta Value-Based Telemedicine Initiative</p>
            <p className="text-slate italic">JMIR Mhealth Uhealth. 2024;12:e56196</p>
          </div>
          <div>
            <p className="font-semibold text-navy">Person-centred coordinated care experience measured by the P3CEQ</p>
            <p className="text-slate italic">Health Serv Insights. 2024;13:11786329241258856</p>
          </div>
          <div>
            <p className="font-semibold text-navy">TELEPROM Psoriasis: Enhancing patient-centered care and HRQoL</p>
            <p className="text-slate italic">Front Med (Lausanne). 2024;11:1465725</p>
          </div>
          <div>
            <p className="font-semibold text-navy">Developing a Prototype Machine Learning Model to Predict QoL in People Living With HIV</p>
            <p className="text-slate italic">Integr Pharm Res Pract. 2025;14:1-16</p>
          </div>
        </div>
      </div>
    </>
  );
}