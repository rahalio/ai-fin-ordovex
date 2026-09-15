import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createConcentrationAlert_Body = z
  .object({
    signalFamily: z.string(),
    notional: z.number(),
    deskId: z.string().optional(),
    message: z.string().optional(),
  })
  .passthrough();
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
const ConcentrationSnapshotId = z.string();
const SignalFamily = z.string();
const ConcentrationCell = z
  .object({
    signalFamily: z.string(),
    notional: z.number(),
    strategyCount: z.number().int(),
    correlatedStrategyIds: z.array(z.string()).optional(),
  })
  .passthrough();
const ConcentrationSnapshot = z
  .object({
    concentrationSnapshotId: z.string().regex(/^cnc_[0-9A-HJKMNP-TV-Z]{26}$/),
    cells: z.array(
      z
        .object({
          signalFamily: z.string(),
          notional: z.number(),
          strategyCount: z.number().int(),
          correlatedStrategyIds: z.array(z.string()).optional(),
        })
        .passthrough()
    ),
    coverageGap: z.boolean().optional(),
    generatedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
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
const ConcentrationSnapshotResponse = z
  .object({
    data: z
      .object({
        concentrationSnapshotId: z
          .string()
          .regex(/^cnc_[0-9A-HJKMNP-TV-Z]{26}$/),
        cells: z.array(
          z
            .object({
              signalFamily: z.string(),
              notional: z.number(),
              strategyCount: z.number().int(),
              correlatedStrategyIds: z.array(z.string()).optional(),
            })
            .passthrough()
        ),
        coverageGap: z.boolean().optional(),
        generatedAt: z.string().datetime({ offset: true }),
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
const ConcentrationAlert = z
  .object({
    alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
    signalFamily: z.string(),
    notional: z.number(),
    deskId: z.string().optional(),
    status: z.enum(['open', 'notified', 'closed']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ConcentrationAlertListData = z
  .object({
    items: z.array(
      z
        .object({
          alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
          signalFamily: z.string(),
          notional: z.number(),
          deskId: z.string().optional(),
          status: z.enum(['open', 'notified', 'closed']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ConcentrationAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
              signalFamily: z.string(),
              notional: z.number(),
              deskId: z.string().optional(),
              status: z.enum(['open', 'notified', 'closed']),
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
const ConcentrationAlertCreate = z
  .object({
    signalFamily: z.string(),
    notional: z.number(),
    deskId: z.string().optional(),
    message: z.string().optional(),
  })
  .passthrough();
const ConcentrationAlertResponse = z
  .object({
    data: z
      .object({
        alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
        signalFamily: z.string(),
        notional: z.number(),
        deskId: z.string().optional(),
        status: z.enum(['open', 'notified', 'closed']),
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
  createConcentrationAlert_Body,
  Problem,
  ConcentrationSnapshotId,
  SignalFamily,
  ConcentrationCell,
  ConcentrationSnapshot,
  ResponseMeta,
  ConcentrationSnapshotResponse,
  ConcentrationAlert,
  ConcentrationAlertListData,
  ConcentrationAlertListResponse,
  ConcentrationAlertCreate,
  ConcentrationAlertResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/concentration',
    alias: 'getConcentrationSnapshot',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            concentrationSnapshotId: z
              .string()
              .regex(/^cnc_[0-9A-HJKMNP-TV-Z]{26}$/),
            cells: z.array(
              z
                .object({
                  signalFamily: z.string(),
                  notional: z.number(),
                  strategyCount: z.number().int(),
                  correlatedStrategyIds: z.array(z.string()).optional(),
                })
                .passthrough()
            ),
            coverageGap: z.boolean().optional(),
            generatedAt: z.string().datetime({ offset: true }),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/concentration/alerts',
    alias: 'listConcentrationAlerts',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
                  signalFamily: z.string(),
                  notional: z.number(),
                  deskId: z.string().optional(),
                  status: z.enum(['open', 'notified', 'closed']),
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
    path: '/v1/concentration/alerts',
    alias: 'createConcentrationAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConcentrationAlert_Body,
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
            alertId: z.string().regex(/^cna_[0-9A-HJKMNP-TV-Z]{26}$/),
            signalFamily: z.string(),
            notional: z.number(),
            deskId: z.string().optional(),
            status: z.enum(['open', 'notified', 'closed']),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
