import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

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
const ControlPlaneHealthId = z.string();
const HealthStatus = z.enum(['healthy', 'degraded', 'critical']);
const ControlPlaneHealth = z
  .object({
    controlPlaneHealthId: z.string().regex(/^hlt_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['healthy', 'degraded', 'critical']),
    decisionLatencyP99Ms: z.number(),
    killSuccessRate: z.number(),
    gatewayHeartbeatsOk: z.number().int().optional(),
    gatewayHeartbeatsTotal: z.number().int().optional(),
    degradeMode: z.string().optional(),
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
const ControlPlaneHealthResponse = z
  .object({
    data: z
      .object({
        controlPlaneHealthId: z.string().regex(/^hlt_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['healthy', 'degraded', 'critical']),
        decisionLatencyP99Ms: z.number(),
        killSuccessRate: z.number(),
        gatewayHeartbeatsOk: z.number().int().optional(),
        gatewayHeartbeatsTotal: z.number().int().optional(),
        degradeMode: z.string().optional(),
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
const GatewayHeartbeat = z
  .object({
    gatewayId: z.string(),
    lastSeenAt: z.string().datetime({ offset: true }),
    ok: z.boolean(),
    latencyMs: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const GatewayHeartbeatListData = z
  .object({
    items: z.array(
      z
        .object({
          gatewayId: z.string(),
          lastSeenAt: z.string().datetime({ offset: true }),
          ok: z.boolean(),
          latencyMs: z.number().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const GatewayHeartbeatListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              gatewayId: z.string(),
              lastSeenAt: z.string().datetime({ offset: true }),
              ok: z.boolean(),
              latencyMs: z.number().optional(),
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

export const schemas: any = {
  Problem,
  ControlPlaneHealthId,
  HealthStatus,
  ControlPlaneHealth,
  ResponseMeta,
  ControlPlaneHealthResponse,
  GatewayHeartbeat,
  GatewayHeartbeatListData,
  GatewayHeartbeatListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/health/control-plane',
    alias: 'getControlPlaneHealth',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            controlPlaneHealthId: z
              .string()
              .regex(/^hlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['healthy', 'degraded', 'critical']),
            decisionLatencyP99Ms: z.number(),
            killSuccessRate: z.number(),
            gatewayHeartbeatsOk: z.number().int().optional(),
            gatewayHeartbeatsTotal: z.number().int().optional(),
            degradeMode: z.string().optional(),
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
    path: '/v1/health/gateways',
    alias: 'listGatewayHeartbeats',
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
                  gatewayId: z.string(),
                  lastSeenAt: z.string().datetime({ offset: true }),
                  ok: z.boolean(),
                  latencyMs: z.number().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
