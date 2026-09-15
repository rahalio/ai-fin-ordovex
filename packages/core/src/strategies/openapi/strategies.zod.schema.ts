import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createTradingStrategy_Body = z
  .object({
    name: z.string(),
    deskId: z.string(),
    markets: z.array(z.string()).optional(),
    kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
    ownerUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const submitModelVersion_Body = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    versionLabel: z.string(),
    simulationEvidenceUri: z.string().url().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const rollbackLiveBinding_Body = z
  .object({
    targetModelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    reason: z.string().optional(),
  })
  .passthrough();
const StrategyStatus = z.enum(['draft', 'certified', 'killed', 'live']);
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
const StrategyId = z.string();
const DeskId = z.string();
const StrategyKind = z.enum(['ai_overlay', 'market_making', 'execution_algo']);
const ModelVersionId = z.string();
const UserId = z.string();
const TradingStrategy = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    deskId: z.string(),
    markets: z.array(z.string()).optional(),
    kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
    status: z.enum(['draft', 'certified', 'killed', 'live']),
    liveModelVersionId: z
      .string()
      .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    ownerUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const TradingStrategyListData = z
  .object({
    items: z.array(
      z
        .object({
          strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          deskId: z.string(),
          markets: z.array(z.string()).optional(),
          kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
          status: z.enum(['draft', 'certified', 'killed', 'live']),
          liveModelVersionId: z
            .string()
            .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          ownerUserId: z
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
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const TradingStrategyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              deskId: z.string(),
              markets: z.array(z.string()).optional(),
              kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
              status: z.enum(['draft', 'certified', 'killed', 'live']),
              liveModelVersionId: z
                .string()
                .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              ownerUserId: z
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
const TradingStrategyCreate = z
  .object({
    name: z.string(),
    deskId: z.string(),
    markets: z.array(z.string()).optional(),
    kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
    ownerUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const TradingStrategyResponse = z
  .object({
    data: z
      .object({
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        deskId: z.string(),
        markets: z.array(z.string()).optional(),
        kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
        status: z.enum(['draft', 'certified', 'killed', 'live']),
        liveModelVersionId: z
          .string()
          .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        ownerUserId: z
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
const ModelVersionStatus = z.enum([
  'draft',
  'submitted',
  'certified',
  'rejected',
  'rolled_back',
]);
const ModelVersion = z
  .object({
    modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    versionLabel: z.string(),
    status: z.enum([
      'draft',
      'submitted',
      'certified',
      'rejected',
      'rolled_back',
    ]),
    simulationEvidenceUri: z.string().url().optional(),
    notes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ModelVersionListData = z
  .object({
    items: z.array(
      z
        .object({
          modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
          versionLabel: z.string(),
          status: z.enum([
            'draft',
            'submitted',
            'certified',
            'rejected',
            'rolled_back',
          ]),
          simulationEvidenceUri: z.string().url().optional(),
          notes: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ModelVersionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
              versionLabel: z.string(),
              status: z.enum([
                'draft',
                'submitted',
                'certified',
                'rejected',
                'rolled_back',
              ]),
              simulationEvidenceUri: z.string().url().optional(),
              notes: z.string().optional(),
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
const ModelVersionCreate = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    versionLabel: z.string(),
    simulationEvidenceUri: z.string().url().optional(),
    notes: z.string().optional(),
  })
  .passthrough();
const ModelVersionResponse = z
  .object({
    data: z
      .object({
        modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        versionLabel: z.string(),
        status: z.enum([
          'draft',
          'submitted',
          'certified',
          'rejected',
          'rolled_back',
        ]),
        simulationEvidenceUri: z.string().url().optional(),
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
const LiveBinding = z
  .object({
    strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
    modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    boundAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const LiveBindingResponse = z
  .object({
    data: z
      .object({
        strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
        modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        boundAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }).optional(),
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
const RollbackRequest = z
  .object({
    targetModelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    reason: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  createTradingStrategy_Body,
  submitModelVersion_Body,
  rollbackLiveBinding_Body,
  StrategyStatus,
  Problem,
  StrategyId,
  DeskId,
  StrategyKind,
  ModelVersionId,
  UserId,
  TradingStrategy,
  TradingStrategyListData,
  ResponseMeta,
  TradingStrategyListResponse,
  TradingStrategyCreate,
  TradingStrategyResponse,
  ModelVersionStatus,
  ModelVersion,
  ModelVersionListData,
  ModelVersionListResponse,
  ModelVersionCreate,
  ModelVersionResponse,
  LiveBinding,
  LiveBindingResponse,
  RollbackRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/strategies',
    alias: 'listTradingStrategies',
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
        name: 'deskId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['draft', 'certified', 'killed', 'live']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  deskId: z.string(),
                  markets: z.array(z.string()).optional(),
                  kind: z.enum([
                    'ai_overlay',
                    'market_making',
                    'execution_algo',
                  ]),
                  status: z.enum(['draft', 'certified', 'killed', 'live']),
                  liveModelVersionId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  ownerUserId: z
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
    path: '/v1/strategies',
    alias: 'createTradingStrategy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createTradingStrategy_Body,
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
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            deskId: z.string(),
            markets: z.array(z.string()).optional(),
            kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
            status: z.enum(['draft', 'certified', 'killed', 'live']),
            liveModelVersionId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            ownerUserId: z
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
    path: '/v1/strategies/:strategyId',
    alias: 'getTradingStrategy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            deskId: z.string(),
            markets: z.array(z.string()).optional(),
            kind: z.enum(['ai_overlay', 'market_making', 'execution_algo']),
            status: z.enum(['draft', 'certified', 'killed', 'live']),
            liveModelVersionId: z
              .string()
              .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            ownerUserId: z
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
  {
    method: 'get',
    path: '/v1/strategies/:strategyId/live-binding',
    alias: 'getLiveBinding',
    requestFormat: 'json',
    parameters: [
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            boundAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/strategies/:strategyId/live-binding',
    alias: 'rollbackLiveBinding',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: rollbackLiveBinding_Body,
      },
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            boundAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/strategies/:strategyId/versions',
    alias: 'listModelVersions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
                  modelVersionId: z
                    .string()
                    .regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
                  versionLabel: z.string(),
                  status: z.enum([
                    'draft',
                    'submitted',
                    'certified',
                    'rejected',
                    'rolled_back',
                  ]),
                  simulationEvidenceUri: z.string().url().optional(),
                  notes: z.string().optional(),
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
    path: '/v1/strategies/:strategyId/versions',
    alias: 'submitModelVersion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: submitModelVersion_Body,
      },
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            versionLabel: z.string(),
            status: z.enum([
              'draft',
              'submitted',
              'certified',
              'rejected',
              'rolled_back',
            ]),
            simulationEvidenceUri: z.string().url().optional(),
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
  {
    method: 'get',
    path: '/v1/strategies/:strategyId/versions/:modelVersionId',
    alias: 'getModelVersion',
    requestFormat: 'json',
    parameters: [
      {
        name: 'strategyId',
        type: 'Path',
        schema: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'modelVersionId',
        type: 'Path',
        schema: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            modelVersionId: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            strategyId: z.string().regex(/^str_[0-9A-HJKMNP-TV-Z]{26}$/),
            versionLabel: z.string(),
            status: z.enum([
              'draft',
              'submitted',
              'certified',
              'rejected',
              'rolled_back',
            ]),
            simulationEvidenceUri: z.string().url().optional(),
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
