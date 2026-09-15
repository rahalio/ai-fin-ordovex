/**
 * Strategies Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/strategies.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DeskId = components["schemas"]["DeskId"];
export type LiveBinding = components["schemas"]["LiveBinding"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionCreate = components["schemas"]["ModelVersionCreate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ModelVersionListData = components["schemas"]["ModelVersionListData"];
export type ModelVersionStatus = components["schemas"]["ModelVersionStatus"];
export type StrategyId = components["schemas"]["StrategyId"];
export type StrategyKind = components["schemas"]["StrategyKind"];
export type StrategyStatus = components["schemas"]["StrategyStatus"];
export type TradingStrategy = components["schemas"]["TradingStrategy"];
export type TradingStrategyCreate = components["schemas"]["TradingStrategyCreate"];
export type TradingStrategyListData = components["schemas"]["TradingStrategyListData"];
export type RollbackRequest = components["schemas"]["RollbackRequest"];
export type Strategy = operations["listTradingStrategies"]["responses"]["200"]["content"]["application/json"]["data"];
export type Version = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTradingStrategyRequestInput = NonNullable<operations["createTradingStrategy"]["requestBody"]>["content"]["application/json"];
export type SubmitModelVersionRequestInput = NonNullable<operations["submitModelVersion"]["requestBody"]>["content"]["application/json"];
export type RollbackLiveBindingRequestInput = NonNullable<operations["rollbackLiveBinding"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTradingStrategiesParams = NonNullable<operations["listTradingStrategies"]["parameters"]["query"]>;
export type GetTradingStrategyParams = operations["getTradingStrategy"]["parameters"]["path"];
export type ListModelVersionsParams = NonNullable<operations["listModelVersions"]["parameters"]["query"]>;
export type SubmitModelVersionParams = operations["submitModelVersion"]["parameters"]["path"];
export type GetModelVersionParams = operations["getModelVersion"]["parameters"]["path"];
export type GetLiveBindingParams = operations["getLiveBinding"]["parameters"]["path"];
export type RollbackLiveBindingParams = operations["rollbackLiveBinding"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTradingStrategiesResponse = operations["listTradingStrategies"]["responses"]["200"]["content"]["application/json"];
export type CreateTradingStrategyResponse = operations["createTradingStrategy"]["responses"]["201"]["content"]["application/json"];
export type GetTradingStrategyResponse = operations["getTradingStrategy"]["responses"]["200"]["content"]["application/json"];
export type ListModelVersionsResponse = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"];
export type SubmitModelVersionResponse = operations["submitModelVersion"]["responses"]["201"]["content"]["application/json"];
export type GetModelVersionResponse = operations["getModelVersion"]["responses"]["200"]["content"]["application/json"];
export type GetLiveBindingResponse = operations["getLiveBinding"]["responses"]["200"]["content"]["application/json"];
export type RollbackLiveBindingResponse = operations["rollbackLiveBinding"]["responses"]["200"]["content"]["application/json"];


