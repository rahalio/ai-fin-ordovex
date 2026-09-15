/**
 * ID Generator Service Implementation — Ordovex prefixes.
 */

import type { DomainCode } from '@ordovex/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@ordovex/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@ordovex/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  strId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.strategies);
  }
  crtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.certifications);
  }
  limId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.limits);
  }
  prtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pretrade);
  }
  tlmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.telemetry);
  }
  kilId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.kills);
  }
  cncId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.concentration);
  }
  incId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.incidents);
  }
  hltId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.health);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
