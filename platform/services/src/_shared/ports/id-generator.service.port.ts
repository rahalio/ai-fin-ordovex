/**
 * IdGeneratorService Port — Ordovex domain prefixes.
 */

import type { DomainCode } from '@ordovex/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  strId(): string;
  crtId(): string;
  limId(): string;
  prtId(): string;
  tlmId(): string;
  kilId(): string;
  cncId(): string;
  incId(): string;
  hltId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
