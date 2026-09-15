import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createIncidentPack_Body = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const StrategyId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const IncidentPackId = z.string();
const IncidentPackStatus = z.enum(['generating', 'ready', 'failed']);
const TimelineEvent = z
  .object({
    at: z.string().datetime({ offset: true }),
    kind: z.string(),
    summary: z.string(),
    omsCorrelationId: z.string().optional(),
  })
  .passthrough();
const IncidentPack = z
  .object({
    incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional(),
    status: z.enum(['generating', 'ready', 'failed']),
    timeline: z
      .array(
        z
          .object({
            at: z.string().datetime({ offset: true }),
            kind: z.string(),
            summary: z.string(),
            omsCorrelationId: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    downloadUrl: z.string().url().optional(),
    exportHash: z.string().optional(),
    missingTelemetrySlices: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const IncidentPackListData = z
  .object({
    items: z.array(
      z
        .object({
          incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
          strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          from: z.string().datetime({ offset: true }).optional(),
          to: z.string().datetime({ offset: true }).optional(),
          status: z.enum(['generating', 'ready', 'failed']),
          timeline: z
            .array(
              z
                .object({
                  at: z.string().datetime({ offset: true }),
                  kind: z.string(),
                  summary: z.string(),
                  omsCorrelationId: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          downloadUrl: z.string().url().optional(),
          exportHash: z.string().optional(),
          missingTelemetrySlices: z.array(z.string()).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const IncidentPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
              strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              from: z.string().datetime({ offset: true }).optional(),
              to: z.string().datetime({ offset: true }).optional(),
              status: z.enum(['generating', 'ready', 'failed']),
              timeline: z
                .array(
                  z
                    .object({
                      at: z.string().datetime({ offset: true }),
                      kind: z.string(),
                      summary: z.string(),
                      omsCorrelationId: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              downloadUrl: z.string().url().optional(),
              exportHash: z.string().optional(),
              missingTelemetrySlices: z.array(z.string()).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const IncidentPackCreate = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const IncidentPackResponse = z
  .object({
    data: z
      .object({
        incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        from: z.string().datetime({ offset: true }).optional(),
        to: z.string().datetime({ offset: true }).optional(),
        status: z.enum(['generating', 'ready', 'failed']),
        timeline: z
          .array(
            z
              .object({
                at: z.string().datetime({ offset: true }),
                kind: z.string(),
                summary: z.string(),
                omsCorrelationId: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        downloadUrl: z.string().url().optional(),
        exportHash: z.string().optional(),
        missingTelemetrySlices: z.array(z.string()).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createIncidentPack_Body,
  StrategyId,
  Problem,
  IncidentPackId,
  IncidentPackStatus,
  TimelineEvent,
  IncidentPack,
  IncidentPackListData,
  ResponseMeta,
  IncidentPackListResponse,
  IncidentPackCreate,
  IncidentPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/incidents/packs',
    alias: 'listIncidentPacks',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'strategyId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  incidentPackId: z
                    .string()
                    .regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  from: z.string().datetime({ offset: true }).optional(),
                  to: z.string().datetime({ offset: true }).optional(),
                  status: z.enum(['generating', 'ready', 'failed']),
                  timeline: z
                    .array(
                      z
                        .object({
                          at: z.string().datetime({ offset: true }),
                          kind: z.string(),
                          summary: z.string(),
                          omsCorrelationId: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  downloadUrl: z.string().url().optional(),
                  exportHash: z.string().optional(),
                  missingTelemetrySlices: z.array(z.string()).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/incidents/packs',
    alias: 'createIncidentPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createIncidentPack_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            from: z.string().datetime({ offset: true }).optional(),
            to: z.string().datetime({ offset: true }).optional(),
            status: z.enum(['generating', 'ready', 'failed']),
            timeline: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    kind: z.string(),
                    summary: z.string(),
                    omsCorrelationId: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            downloadUrl: z.string().url().optional(),
            exportHash: z.string().optional(),
            missingTelemetrySlices: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/incidents/packs/:incidentPackId',
    alias: 'getIncidentPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentPackId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            incidentPackId: z.string().regex(/^inc_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            from: z.string().datetime({ offset: true }).optional(),
            to: z.string().datetime({ offset: true }).optional(),
            status: z.enum(['generating', 'ready', 'failed']),
            timeline: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    kind: z.string(),
                    summary: z.string(),
                    omsCorrelationId: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            downloadUrl: z.string().url().optional(),
            exportHash: z.string().optional(),
            missingTelemetrySlices: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
