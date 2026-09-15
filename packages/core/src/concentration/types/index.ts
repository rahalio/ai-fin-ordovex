/**
 * Concentration Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/concentration.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConcentrationAlert = components["schemas"]["ConcentrationAlert"];
export type ConcentrationAlertCreate = components["schemas"]["ConcentrationAlertCreate"];
export type ConcentrationAlertListData = components["schemas"]["ConcentrationAlertListData"];
export type ConcentrationCell = components["schemas"]["ConcentrationCell"];
export type ConcentrationSnapshot = components["schemas"]["ConcentrationSnapshot"];
export type ConcentrationSnapshotId = components["schemas"]["ConcentrationSnapshotId"];
export type SignalFamily = components["schemas"]["SignalFamily"];
export type Alert = operations["listConcentrationAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateConcentrationAlertRequestInput = NonNullable<operations["createConcentrationAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConcentrationAlertsParams = NonNullable<operations["listConcentrationAlerts"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetConcentrationSnapshotResponse = operations["getConcentrationSnapshot"]["responses"]["200"]["content"]["application/json"];
export type ListConcentrationAlertsResponse = operations["listConcentrationAlerts"]["responses"]["200"]["content"]["application/json"];
export type CreateConcentrationAlertResponse = operations["createConcentrationAlert"]["responses"]["201"]["content"]["application/json"];


