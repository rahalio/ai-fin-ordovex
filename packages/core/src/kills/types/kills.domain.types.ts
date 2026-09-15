/**
 * Kills Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/kills.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type KillOrder = components["schemas"]["KillOrder"];
export type KillOrderCreate = components["schemas"]["KillOrderCreate"];
export type KillOrderId = components["schemas"]["KillOrderId"];
export type KillOrderListData = components["schemas"]["KillOrderListData"];
export type KillScope = components["schemas"]["KillScope"];
export type KillStatus = components["schemas"]["KillStatus"];
export type RestartAuthCreate = components["schemas"]["RestartAuthCreate"];
export type RestartAuthId = components["schemas"]["RestartAuthId"];
export type RestartAuthorisation = components["schemas"]["RestartAuthorisation"];
export type Kill = operations["listKillOrders"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IssueKillOrderRequestInput = NonNullable<operations["issueKillOrder"]["requestBody"]>["content"]["application/json"];
export type AuthoriseRestartRequestInput = NonNullable<operations["authoriseRestart"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListKillOrdersParams = NonNullable<operations["listKillOrders"]["parameters"]["query"]>;
export type GetKillOrderParams = operations["getKillOrder"]["parameters"]["path"];
export type AuthoriseRestartParams = operations["authoriseRestart"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListKillOrdersResponse = operations["listKillOrders"]["responses"]["200"]["content"]["application/json"];
export type IssueKillOrderResponse = operations["issueKillOrder"]["responses"]["201"]["content"]["application/json"];
export type GetKillOrderResponse = operations["getKillOrder"]["responses"]["200"]["content"]["application/json"];
export type AuthoriseRestartResponse = operations["authoriseRestart"]["responses"]["201"]["content"]["application/json"];


