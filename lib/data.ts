import fs from 'fs';
import path from 'path';
import type { PublicationsData, MentionsData, IdentityConfig } from './types';

const dataDir = path.join(process.cwd(), 'data');
const configDir = path.join(process.cwd(), 'config');

export function getPublications(): PublicationsData {
  const raw = fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf-8');
  return JSON.parse(raw) as PublicationsData;
}

export function getMentions(): MentionsData {
  const raw = fs.readFileSync(path.join(dataDir, 'mentions.json'), 'utf-8');
  return JSON.parse(raw) as MentionsData;
}

export function getIdentity(): IdentityConfig {
  const raw = fs.readFileSync(path.join(configDir, 'identity.json'), 'utf-8');
  return JSON.parse(raw) as IdentityConfig;
}
