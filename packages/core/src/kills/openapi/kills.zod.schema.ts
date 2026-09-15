import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const issueKillOrder_Body = z
  .object({
    scope: z.enum(['strategy', 'desk', 'firm']),
    targetId: z.string(),
    cancelWorking: z.boolean().optional().default(true),
    reason: z.string(),
  })
  .passthrough();
const authoriseRestart_Body = z
  .object({
    killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().optional(),
  })
  .passthrough();
const KillScope = z.enum(['strategy', 'desk', 'firm']);
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
const KillOrderId = z.string();
const KillStatus = z.enum(['issued', 'completing', 'completed', 'failed']);
const UserId = z.string();
const KillOrder = z
  .object({
    killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
    scope: z.enum(['strategy', 'desk', 'firm']),
    targetId: z.string(),
    cancelWorking: z.boolean().optional(),
    reason: z.string(),
    status: z.enum(['issued', 'completing', 'completed', 'failed']),
    issuedBy: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    slaMs: z.number().int().optional(),
    completedAt: z.string().datetime({ offset: true }).optional(),
    issuedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const KillOrderListData = z
  .object({
    items: z.array(
      z
        .object({
          killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
          scope: z.enum(['strategy', 'desk', 'firm']),
          targetId: z.string(),
          cancelWorking: z.boolean().optional(),
          reason: z.string(),
          status: z.enum(['issued', 'completing', 'completed', 'failed']),
          issuedBy: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          slaMs: z.number().int().optional(),
          completedAt: z.string().datetime({ offset: true }).optional(),
          issuedAt: z.string().datetime({ offset: true }),
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
const KillOrderListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
              scope: z.enum(['strategy', 'desk', 'firm']),
              targetId: z.string(),
              cancelWorking: z.boolean().optional(),
              reason: z.string(),
              status: z.enum(['issued', 'completing', 'completed', 'failed']),
              issuedBy: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              slaMs: z.number().int().optional(),
              completedAt: z.string().datetime({ offset: true }).optional(),
              issuedAt: z.string().datetime({ offset: true }),
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
const KillOrderCreate = z
  .object({
    scope: z.enum(['strategy', 'desk', 'firm']),
    targetId: z.string(),
    cancelWorking: z.boolean().optional().default(true),
    reason: z.string(),
  })
  .passthrough();
const KillOrderResponse = z
  .object({
    data: z
      .object({
        killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
        scope: z.enum(['strategy', 'desk', 'firm']),
        targetId: z.string(),
        cancelWorking: z.boolean().optional(),
        reason: z.string(),
        status: z.enum(['issued', 'completing', 'completed', 'failed']),
        issuedBy: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        slaMs: z.number().int().optional(),
        completedAt: z.string().datetime({ offset: true }).optional(),
        issuedAt: z.string().datetime({ offset: true }),
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
const RestartAuthCreate = z
  .object({
    killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().optional(),
  })
  .passthrough();
const RestartAuthId = z.string();
const RestartAuthorisation = z
  .object({
    restartAuthId: z.string().regex(/^rsa_[0-9A-HJKMNP-TV-Z]{26}$/),
    killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['pending', 'authorised', 'denied']),
    authorisedBy: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RestartAuthResponse = z
  .object({
    data: z
      .object({
        restartAuthId: z.string().regex(/^rsa_[0-9A-HJKMNP-TV-Z]{26}$/),
        killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['pending', 'authorised', 'denied']),
        authorisedBy: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        notes: z.string().optional(),
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
  issueKillOrder_Body,
  authoriseRestart_Body,
  KillScope,
  Problem,
  KillOrderId,
  KillStatus,
  UserId,
  KillOrder,
  KillOrderListData,
  ResponseMeta,
  KillOrderListResponse,
  KillOrderCreate,
  KillOrderResponse,
  RestartAuthCreate,
  RestartAuthId,
  RestartAuthorisation,
  RestartAuthResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/kills',
    alias: 'listKillOrders',
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
        name: 'scope',
        type: 'Query',
        schema: z.enum(['strategy', 'desk', 'firm']).optional(),
      },
      {
        name: 'targetId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
                  scope: z.enum(['strategy', 'desk', 'firm']),
                  targetId: z.string(),
                  cancelWorking: z.boolean().optional(),
                  reason: z.string(),
                  status: z.enum([
                    'issued',
                    'completing',
                    'completed',
                    'failed',
                  ]),
                  issuedBy: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  slaMs: z.number().int().optional(),
                  completedAt: z.string().datetime({ offset: true }).optional(),
                  issuedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/kills',
    alias: 'issueKillOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: issueKillOrder_Body,
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
            killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
            scope: z.enum(['strategy', 'desk', 'firm']),
            targetId: z.string(),
            cancelWorking: z.boolean().optional(),
            reason: z.string(),
            status: z.enum(['issued', 'completing', 'completed', 'failed']),
            issuedBy: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            slaMs: z.number().int().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
            issuedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/kills/:killOrderId',
    alias: 'getKillOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'killOrderId',
        type: 'Path',
        schema: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
            scope: z.enum(['strategy', 'desk', 'firm']),
            targetId: z.string(),
            cancelWorking: z.boolean().optional(),
            reason: z.string(),
            status: z.enum(['issued', 'completing', 'completed', 'failed']),
            issuedBy: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            slaMs: z.number().int().optional(),
            completedAt: z.string().datetime({ offset: true }).optional(),
            issuedAt: z.string().datetime({ offset: true }),
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
  {
    method: 'post',
    path: '/v1/kills/:killOrderId/restart',
    alias: 'authoriseRestart',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: authoriseRestart_Body,
      },
      {
        name: 'killOrderId',
        type: 'Path',
        schema: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            restartAuthId: z.string().regex(/^rsa_[0-9A-HJKMNP-TV-Z]{26}$/),
            killOrderId: z.string().regex(/^kil_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'authorised', 'denied']),
            authorisedBy: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            notes: z.string().optional(),
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
