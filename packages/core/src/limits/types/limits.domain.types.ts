/**
 * Limits Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/limits.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type HierarchyLevel = components["schemas"]["HierarchyLevel"];
export type LimitPackage = components["schemas"]["LimitPackage"];
export type LimitPackageId = components["schemas"]["LimitPackageId"];
export type LimitPackageListData = components["schemas"]["LimitPackageListData"];
export type LimitPackageUpsert = components["schemas"]["LimitPackageUpsert"];
export type LimitRaiseCreate = components["schemas"]["LimitRaiseCreate"];
export type LimitRaiseProposal = components["schemas"]["LimitRaiseProposal"];
export type LimitRaiseStatus = components["schemas"]["LimitRaiseStatus"];
export type StrategyId = components["schemas"]["StrategyId"];
export type TightestWinsSimulation = components["schemas"]["TightestWinsSimulation"];
export type Limit = operations["listLimitPackages"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertLimitPackageRequestInput = NonNullable<operations["upsertLimitPackage"]["requestBody"]>["content"]["application/json"];
export type ProposeLimitRaiseRequestInput = NonNullable<operations["proposeLimitRaise"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLimitPackagesParams = NonNullable<operations["listLimitPackages"]["parameters"]["query"]>;
export type GetLimitPackageParams = operations["getLimitPackage"]["parameters"]["path"];
export type ApproveLimitRaiseParams = operations["approveLimitRaise"]["parameters"]["path"];
export type SimulateTightestWinsParams = NonNullable<operations["simulateTightestWins"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLimitPackagesResponse = operations["listLimitPackages"]["responses"]["200"]["content"]["application/json"];
export type UpsertLimitPackageResponse = operations["upsertLimitPackage"]["responses"]["200"]["content"]["application/json"];
export type GetLimitPackageResponse = operations["getLimitPackage"]["responses"]["200"]["content"]["application/json"];
export type ProposeLimitRaiseResponse = operations["proposeLimitRaise"]["responses"]["201"]["content"]["application/json"];
export type ApproveLimitRaiseResponse = operations["approveLimitRaise"]["responses"]["200"]["content"]["application/json"];
export type SimulateTightestWinsResponse = operations["simulateTightestWins"]["responses"]["200"]["content"]["application/json"];


