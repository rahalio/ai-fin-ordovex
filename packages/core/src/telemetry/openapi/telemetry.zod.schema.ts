import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const ingestTelemetry_Body = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    pnl: z.number(),
    drawdown: z.number(),
    messageRate: z.number().int(),
    inventorySkew: z.number().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
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
const TelemetrySnapshotId = z.string();
const TelemetrySnapshot = z
  .object({
    telemetrySnapshotId: z.string().regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    pnl: z.number(),
    drawdown: z.number(),
    messageRate: z.number().int(),
    inventorySkew: z.number().optional(),
    observedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const TelemetrySnapshotListData = z
  .object({
    items: z.array(
      z
        .object({
          telemetrySnapshotId: z.string().regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
          strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          pnl: z.number(),
          drawdown: z.number(),
          messageRate: z.number().int(),
          inventorySkew: z.number().optional(),
          observedAt: z.string().datetime({ offset: true }),
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
const TelemetrySnapshotListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              telemetrySnapshotId: z
                .string()
                .regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
              strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              pnl: z.number(),
              drawdown: z.number(),
              messageRate: z.number().int(),
              inventorySkew: z.number().optional(),
              observedAt: z.string().datetime({ offset: true }),
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
const TelemetrySnapshotCreate = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    pnl: z.number(),
    drawdown: z.number(),
    messageRate: z.number().int(),
    inventorySkew: z.number().optional(),
    observedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const TelemetrySnapshotResponse = z
  .object({
    data: z
      .object({
        telemetrySnapshotId: z.string().regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        pnl: z.number(),
        drawdown: z.number(),
        messageRate: z.number().int(),
        inventorySkew: z.number().optional(),
        observedAt: z.string().datetime({ offset: true }),
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
const BreachActionId = z.string();
const BreachKind = z.enum([
  'drawdown',
  'message_rate',
  'max_loss',
  'inventory_skew',
]);
const BreachActionType = z.enum(['throttle', 'kill', 'alert']);
const UserId = z.string();
const BreachAction = z
  .object({
    breachActionId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    kind: z.enum(['drawdown', 'message_rate', 'max_loss', 'inventory_skew']),
    action: z.enum(['throttle', 'kill', 'alert']),
    thresholdValue: z.number().optional(),
    observedValue: z.number().optional(),
    status: z.enum(['triggered', 'acknowledged', 'cleared']),
    acknowledgedBy: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const BreachActionListData = z
  .object({
    items: z.array(
      z
        .object({
          breachActionId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
          strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          kind: z.enum([
            'drawdown',
            'message_rate',
            'max_loss',
            'inventory_skew',
          ]),
          action: z.enum(['throttle', 'kill', 'alert']),
          thresholdValue: z.number().optional(),
          observedValue: z.number().optional(),
          status: z.enum(['triggered', 'acknowledged', 'cleared']),
          acknowledgedBy: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const BreachActionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              breachActionId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
              strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              kind: z.enum([
                'drawdown',
                'message_rate',
                'max_loss',
                'inventory_skew',
              ]),
              action: z.enum(['throttle', 'kill', 'alert']),
              thresholdValue: z.number().optional(),
              observedValue: z.number().optional(),
              status: z.enum(['triggered', 'acknowledged', 'cleared']),
              acknowledgedBy: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
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
const BreachAcknowledge = z
  .object({ notes: z.string() })
  .partial()
  .passthrough();
const BreachActionResponse = z
  .object({
    data: z
      .object({
        breachActionId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        kind: z.enum([
          'drawdown',
          'message_rate',
          'max_loss',
          'inventory_skew',
        ]),
        action: z.enum(['throttle', 'kill', 'alert']),
        thresholdValue: z.number().optional(),
        observedValue: z.number().optional(),
        status: z.enum(['triggered', 'acknowledged', 'cleared']),
        acknowledgedBy: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
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
  ingestTelemetry_Body,
  StrategyId,
  Problem,
  TelemetrySnapshotId,
  TelemetrySnapshot,
  TelemetrySnapshotListData,
  ResponseMeta,
  TelemetrySnapshotListResponse,
  TelemetrySnapshotCreate,
  TelemetrySnapshotResponse,
  BreachActionId,
  BreachKind,
  BreachActionType,
  UserId,
  BreachAction,
  BreachActionListData,
  BreachActionListResponse,
  BreachAcknowledge,
  BreachActionResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/telemetry',
    alias: 'ingestTelemetry',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ingestTelemetry_Body,
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
            telemetrySnapshotId: z
              .string()
              .regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            pnl: z.number(),
            drawdown: z.number(),
            messageRate: z.number().int(),
            inventorySkew: z.number().optional(),
            observedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/telemetry',
    alias: 'listTelemetrySnapshots',
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
                  telemetrySnapshotId: z
                    .string()
                    .regex(/^tlm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  pnl: z.number(),
                  drawdown: z.number(),
                  messageRate: z.number().int(),
                  inventorySkew: z.number().optional(),
                  observedAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/telemetry/breaches',
    alias: 'listBreachActions',
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
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['triggered', 'acknowledged', 'cleared']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  breachActionId: z
                    .string()
                    .regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  kind: z.enum([
                    'drawdown',
                    'message_rate',
                    'max_loss',
                    'inventory_skew',
                  ]),
                  action: z.enum(['throttle', 'kill', 'alert']),
                  thresholdValue: z.number().optional(),
                  observedValue: z.number().optional(),
                  status: z.enum(['triggered', 'acknowledged', 'cleared']),
                  acknowledgedBy: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
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
    path: '/v1/telemetry/breaches/:breachActionId/acknowledge',
    alias: 'acknowledgeBreachAction',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ notes: z.string() }).partial().passthrough(),
      },
      {
        name: 'breachActionId',
        type: 'Path',
        schema: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            breachActionId: z.string().regex(/^brc_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            kind: z.enum([
              'drawdown',
              'message_rate',
              'max_loss',
              'inventory_skew',
            ]),
            action: z.enum(['throttle', 'kill', 'alert']),
            thresholdValue: z.number().optional(),
            observedValue: z.number().optional(),
            status: z.enum(['triggered', 'acknowledged', 'cleared']),
            acknowledgedBy: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
