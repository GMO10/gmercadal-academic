// ── Publication ──────────────────────────────────────────────
export interface Publication {
  /** Stable dedupe key: DOI > PMID > hash */
  id: string;
  title: string;
  authors: string[];
  year: number | null;
  date: string | null;
  journal: string | null;
  type: string | null;
  doi: string | null;
  pmid: string | null;
  orcidPutCode: string | null;
  abstract: string | null;
  url: string | null;
  sources: ('orcid' | 'crossref' | 'pubmed')[];
}

export interface PublicationsData {
  lastUpdated: string;
  count: number;
  publications: Publication[];
  yearIndex: Record<string, number[]>;
}

// ── Mention ─────────────────────────────────────────────────
export interface Mention {
  id: string;
  title: string;
  url: string;
  source: string;
  domain: string;
  date: string | null;
  language: string | null;
  snippet: string | null;
  score: number;
  signalsActivated: string[];
  imageUrl: string | null;
}

export interface MentionsData {
  lastUpdated: string;
  count: number;
  scoreThreshold: number;
  mentions: Mention[];
}

// ── Config (identity.json shape) ────────────────────────────
export interface IdentityConfig {
  person: {
    fullName: string;
    shortName: string;
    nameVariants: string[];
    orcid: string;
    bio: string;
    links: Record<string, string>;
  };
  affiliations: string[];
  pubmed: {
    authorQuery: string;
    affiliationQuery: string;
  };
  keywords: string[];
  mentions: {
    scoreThreshold: number;
    signals: Record<string, any>;
  };
}
