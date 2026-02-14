export type Lang = 'en' | 'es' | 'ca';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.publications': 'Publications',
    'nav.mentions': 'Mentions',
    'nav.naveta': 'NAVETA',
    'nav.contact': 'Contact',

    // Hero
    'hero.subtitle': 'Clinical Pharmacist \u00b7 Researcher \u00b7 Educator',
    'hero.downloadCV': 'Download CV',

    // Academic Background
    'bg.title': 'Academic Background',
    'bg.p1': 'PhD in Pharmacy (Cum Laude) from the Universitat de Barcelona, with a thesis on the effectiveness of glutamine in perioperative parenteral nutrition. Specialist in Hospital Pharmacy trained at Hospital Universitari de Bellvitge.',
    'bg.p2': 'Postgraduate diplomas in Health Sciences Statistics (UAB) and Pharmacoeconomics (UPF). Master in Medical Direction and Clinical Management (UNED, 2023-2025). Currently pursuing the Advanced Master in Artificial Intelligence in Health Sciences Education (Universitat de Barcelona).',
    'bg.p3': 'Associate Professor of Biochemistry and Nutrition at the Universitat de les Illes Balears. Scientific Coordinator of the postgraduate diploma in Value-Based Healthcare for Dermatological and Rheumatic Diseases (Universidad de Alcal\u00e1, accredited by SEFH).',
    'bg.p4': 'Current research focuses on value-based healthcare, specifically the implementation, analysis, and psychometric validation of PROMs and PREMs, as well as the application of artificial intelligence and machine learning to build predictive models for patient-reported outcomes.',

    // Home sections
    'home.latestPubs': 'Latest Publications',
    'home.viewAll': 'View all',
    'home.recentMentions': 'Recent Mentions',
    'home.print': 'Print / Save PDF',

    // Publications page
    'pubs.title': 'Publications',
    'pubs.count': 'publications',
    'pubs.lastUpdated': 'Last updated',
    'pubs.filterYear': 'All years',
    'pubs.filterType': 'All types',
    'pubs.onlyDOI': 'Only with DOI',
    'pubs.search': 'Search by title, author, journal...',

    // Mentions page
    'mentions.title': 'Mentions and News',
    'mentions.count': 'mentions',
    'mentions.score': 'score',
    'mentions.scoreInfo': 'Each mention is scored for relevance using affiliation signals, name matching, and thematic keywords. Adjust the minimum score slider to see more or fewer results.',

    // NAVETA page
    'naveta.featured': 'Featured Project',
    'naveta.title': 'NAVETA Project',
    'naveta.description': 'A value-based telemedicine platform integrating Patient-Reported Outcome Measures (PROMs) and Patient-Reported Experience Measures (PREMs) into routine hospital pharmacy care. NAVETA enables systematic, real-time monitoring of health-related quality of life across chronic conditions.',
    'naveta.visit': 'Visit NAVETA at FARUPEIB',
    'naveta.objectives': 'Objectives',
    'naveta.obj1': 'Implement systematic PROMs/PREMs collection via telepharmacy',
    'naveta.obj2': 'Enable value-based pharmaceutical care for chronic patients',
    'naveta.obj3': 'Monitor health-related quality of life in real time',
    'naveta.obj4': 'Apply machine learning for outcome prediction',
    'naveta.obj5': 'Reduce unnecessary hospital visits through telemedicine',
    'naveta.areas': 'Therapeutic Areas',
    'naveta.awards': 'Awards',
    'naveta.keyPubs': 'Key Publications',

    // Contact page
    'contact.title': 'Contact',
    'contact.profiles': 'Academic Profiles',
    'contact.phone': 'Phone',
    'contact.affiliations': 'Affiliations',

    // Footer
    'footer.dataUpdated': 'Data auto-updated via',
  },
  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.publications': 'Publicaciones',
    'nav.mentions': 'Menciones',
    'nav.naveta': 'NAVETA',
    'nav.contact': 'Contacto',

    // Hero
    'hero.subtitle': 'Farmac\u00e9utico Cl\u00ednico \u00b7 Investigador \u00b7 Docente',
    'hero.downloadCV': 'Descargar CV',

    // Academic Background
    'bg.title': 'Formaci\u00f3n Acad\u00e9mica',
    'bg.p1': 'Doctor en Farmacia (Cum Laude) por la Universitat de Barcelona, con tesis sobre la efectividad de la glutamina en nutrici\u00f3n parenteral perioperatoria. Especialista en Farmacia Hospitalaria formado en el Hospital Universitari de Bellvitge.',
    'bg.p2': 'Diplomas de posgrado en Estad\u00edstica en Ciencias de la Salud (UAB) y Farmacoeconom\u00eda (UPF). M\u00e1ster en Direcci\u00f3n M\u00e9dica y Gesti\u00f3n Cl\u00ednica (UNED, 2023-2025). Actualmente cursando el M\u00e1ster Avanzado en Inteligencia Artificial en Docencia en Ciencias de la Salud (Universitat de Barcelona).',
    'bg.p3': 'Profesor asociado de Bioqu\u00edmica y Nutrici\u00f3n en la Universitat de les Illes Balears. Coordinador Cient\u00edfico del diploma de Experto Universitario en Atenci\u00f3n Sanitaria Basada en Valor en Enfermedades Dermatol\u00f3gicas y Reum\u00e1ticas (Universidad de Alcal\u00e1, acreditado por la SEFH).',
    'bg.p4': 'Su investigaci\u00f3n actual se centra en la asistencia sanitaria basada en valor, concretamente en la implementaci\u00f3n, an\u00e1lisis y validaci\u00f3n psicom\u00e9trica de PROMs y PREMs, as\u00ed como en la aplicaci\u00f3n de inteligencia artificial y machine learning para construir modelos predictivos de resultados reportados por pacientes.',

    // Home sections
    'home.latestPubs': '\u00daltimas Publicaciones',
    'home.viewAll': 'Ver todas',
    'home.recentMentions': 'Menciones Recientes',
    'home.print': 'Imprimir / Guardar PDF',

    // Publications page
    'pubs.title': 'Publicaciones',
    'pubs.count': 'publicaciones',
    'pubs.lastUpdated': '\u00daltima actualizaci\u00f3n',
    'pubs.filterYear': 'Todos los a\u00f1os',
    'pubs.filterType': 'Todos los tipos',
    'pubs.onlyDOI': 'Solo con DOI',
    'pubs.search': 'Buscar por t\u00edtulo, autor, revista...',

    // Mentions page
    'mentions.title': 'Menciones y Noticias',
    'mentions.count': 'menciones',
    'mentions.score': 'puntuaci\u00f3n',
    'mentions.scoreInfo': 'Cada menci\u00f3n se puntua por relevancia usando se\u00f1ales de afiliaci\u00f3n, coincidencia de nombre y palabras clave tem\u00e1ticas. Ajusta el control de puntuaci\u00f3n m\u00ednima para ver m\u00e1s o menos resultados.',

    // NAVETA page
    'naveta.featured': 'Proyecto Destacado',
    'naveta.title': 'Proyecto NAVETA',
    'naveta.description': 'Una plataforma de telemedicina basada en valor que integra medidas de resultados reportados por pacientes (PROMs) y medidas de experiencia reportadas por pacientes (PREMs) en la atenci\u00f3n farmac\u00e9utica hospitalaria. NAVETA permite la monitorizaci\u00f3n sistem\u00e1tica en tiempo real de la calidad de vida relacionada con la salud en enfermedades cr\u00f3nicas.',
    'naveta.visit': 'Visitar NAVETA en FARUPEIB',
    'naveta.objectives': 'Objetivos',
    'naveta.obj1': 'Implementar recogida sistem\u00e1tica de PROMs/PREMs v\u00eda telefarmacia',
    'naveta.obj2': 'Facilitar atenci\u00f3n farmac\u00e9utica basada en valor para pacientes cr\u00f3nicos',
    'naveta.obj3': 'Monitorizar la calidad de vida en tiempo real',
    'naveta.obj4': 'Aplicar machine learning para predicci\u00f3n de resultados',
    'naveta.obj5': 'Reducir visitas hospitalarias innecesarias mediante telemedicina',
    'naveta.areas': '\u00c1reas Terap\u00e9uticas',
    'naveta.awards': 'Premios',
    'naveta.keyPubs': 'Publicaciones Clave',

    // Contact page
    'contact.title': 'Contacto',
    'contact.profiles': 'Perfiles Acad\u00e9micos',
    'contact.phone': 'Tel\u00e9fono',
    'contact.affiliations': 'Afiliaciones',

    // Footer
    'footer.dataUpdated': 'Datos actualizados autom\u00e1ticamente v\u00eda',
  },
  ca: {
    // Nav
    'nav.home': 'Inici',
    'nav.publications': 'Publicacions',
    'nav.mentions': 'Mencions',
    'nav.naveta': 'NAVETA',
    'nav.contact': 'Contacte',

    // Hero
    'hero.subtitle': 'Farmac\u00e8utic Cl\u00ednic \u00b7 Investigador \u00b7 Docent',
    'hero.downloadCV': 'Descarregar CV',

    // Academic Background
    'bg.title': 'Formaci\u00f3 Acad\u00e8mica',
    'bg.p1': 'Doctor en Farm\u00e0cia (Cum Laude) per la Universitat de Barcelona, amb tesi sobre l\'efectivitat de la glutamina en nutrici\u00f3 parenteral perioperat\u00f2ria. Especialista en Farm\u00e0cia Hospitalari format a l\'Hospital Universitari de Bellvitge.',
    'bg.p2': 'Diplomes de postgrau en Estad\u00edstica en Ci\u00e8ncies de la Salut (UAB) i Farmacoeconomia (UPF). M\u00e0ster en Direcci\u00f3 M\u00e8dica i Gesti\u00f3 Cl\u00ednica (UNED, 2023-2025). Actualment cursant el M\u00e0ster Avan\u00e7at en Intel\u00b7lig\u00e8ncia Artificial en Doc\u00e8ncia en Ci\u00e8ncies de la Salut (Universitat de Barcelona).',
    'bg.p3': 'Professor associat de Bioqu\u00edmica i Nutrici\u00f3 a la Universitat de les Illes Balears. Coordinador Cient\u00edfic del diploma d\'Expert Universitari en Atenci\u00f3 Sanit\u00e0ria Basada en Valor en Malalties Dermatol\u00f2giques i Reum\u00e0tiques (Universidad de Alcal\u00e1, acreditat per la SEFH).',
    'bg.p4': 'La seva investigaci\u00f3 actual se centra en l\'assist\u00e8ncia sanit\u00e0ria basada en valor, concretament en la implementaci\u00f3, an\u00e0lisi i validaci\u00f3 psicom\u00e8trica de PROMs i PREMs, aix\u00ed com en l\'aplicaci\u00f3 d\'intel\u00b7lig\u00e8ncia artificial i machine learning per construir models predictius de resultats reportats per pacients.',

    // Home sections
    'home.latestPubs': 'Darreres Publicacions',
    'home.viewAll': 'Veure totes',
    'home.recentMentions': 'Mencions Recents',
    'home.print': 'Imprimir / Desar PDF',

    // Publications page
    'pubs.title': 'Publicacions',
    'pubs.count': 'publicacions',
    'pubs.lastUpdated': 'Darrera actualitzaci\u00f3',
    'pubs.filterYear': 'Tots els anys',
    'pubs.filterType': 'Tots els tipus',
    'pubs.onlyDOI': 'Nom\u00e9s amb DOI',
    'pubs.search': 'Cercar per t\u00edtol, autor, revista...',

    // Mentions page
    'mentions.title': 'Mencions i Not\u00edcies',
    'mentions.count': 'mencions',
    'mentions.score': 'puntuaci\u00f3',
    'mentions.scoreInfo': 'Cada menci\u00f3 es puntua per rellev\u00e0ncia usant senyals d\'afiliaci\u00f3, coincid\u00e8ncia de nom i paraules clau tem\u00e0tiques. Ajusta el control de puntuaci\u00f3 m\u00ednima per veure m\u00e9s o menys resultats.',

    // NAVETA page
    'naveta.featured': 'Projecte Destacat',
    'naveta.title': 'Projecte NAVETA',
    'naveta.description': 'Una plataforma de telemedicina basada en valor que integra mesures de resultats reportats per pacients (PROMs) i mesures d\'experi\u00e8ncia reportades per pacients (PREMs) en l\'atenci\u00f3 farmac\u00e8utica hospitalari. NAVETA permet la monitoritzaci\u00f3 sistem\u00e0tica en temps real de la qualitat de vida relacionada amb la salut en malalties cr\u00f2niques.',
    'naveta.visit': 'Visitar NAVETA a FARUPEIB',
    'naveta.objectives': 'Objectius',
    'naveta.obj1': 'Implementar recollida sistem\u00e0tica de PROMs/PREMs via telefarm\u00e0cia',
    'naveta.obj2': 'Facilitar atenci\u00f3 farmac\u00e8utica basada en valor per a pacients cr\u00f2nics',
    'naveta.obj3': 'Monitoritzar la qualitat de vida en temps real',
    'naveta.obj4': 'Aplicar machine learning per a predicci\u00f3 de resultats',
    'naveta.obj5': 'Reduir visites hospitalari\u00e8s inneccess\u00e0ries mitjan\u00e7ant telemedicina',
    'naveta.areas': '\u00c0rees Terap\u00e8utiques',
    'naveta.awards': 'Premis',
    'naveta.keyPubs': 'Publicacions Clau',

    // Contact page
    'contact.title': 'Contacte',
    'contact.profiles': 'Perfils Acad\u00e8mics',
    'contact.phone': 'Tel\u00e8fon',
    'contact.affiliations': 'Afiliacions',

    // Footer
    'footer.dataUpdated': 'Dades actualitzades autom\u00e0ticament via',
  },
};

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}
