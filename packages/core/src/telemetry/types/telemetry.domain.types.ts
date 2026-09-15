/**
 * Telemetry Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/telemetry.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BreachAcknowledge = components["schemas"]["BreachAcknowledge"];
export type BreachAction = components["schemas"]["BreachAction"];
export type BreachActionId = components["schemas"]["BreachActionId"];
export type BreachActionListData = components["schemas"]["BreachActionListData"];
export type BreachActionType = components["schemas"]["BreachActionType"];
export type BreachKind = components["schemas"]["BreachKind"];
export type StrategyId = components["schemas"]["StrategyId"];
export type TelemetrySnapshot = components["schemas"]["TelemetrySnapshot"];
export type TelemetrySnapshotCreate = components["schemas"]["TelemetrySnapshotCreate"];
export type TelemetrySnapshotId = components["schemas"]["TelemetrySnapshotId"];
export type TelemetrySnapshotListData = components["schemas"]["TelemetrySnapshotListData"];
export type Telemetry = operations["listTelemetrySnapshots"]["responses"]["200"]["content"]["application/json"]["data"];
export type Breach = operations["listBreachActions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IngestTelemetryRequestInput = NonNullable<operations["ingestTelemetry"]["requestBody"]>["content"]["application/json"];
export type AcknowledgeBreachActionRequestInput = NonNullable<operations["acknowledgeBreachAction"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTelemetrySnapshotsParams = NonNullable<operations["listTelemetrySnapshots"]["parameters"]["query"]>;
export type ListBreachActionsParams = NonNullable<operations["listBreachActions"]["parameters"]["query"]>;
export type AcknowledgeBreachActionParams = operations["acknowledgeBreachAction"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type IngestTelemetryResponse = operations["ingestTelemetry"]["responses"]["201"]["content"]["application/json"];
export type ListTelemetrySnapshotsResponse = operations["listTelemetrySnapshots"]["responses"]["200"]["content"]["application/json"];
export type ListBreachActionsResponse = operations["listBreachActions"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeBreachActionResponse = operations["acknowledgeBreachAction"]["responses"]["200"]["content"]["application/json"];


