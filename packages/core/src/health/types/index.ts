/**
 * Health Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/health.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ControlPlaneHealth = components["schemas"]["ControlPlaneHealth"];
export type ControlPlaneHealthId = components["schemas"]["ControlPlaneHealthId"];
export type GatewayHeartbeat = components["schemas"]["GatewayHeartbeat"];
export type GatewayHeartbeatListData = components["schemas"]["GatewayHeartbeatListData"];
export type HealthStatus = components["schemas"]["HealthStatus"];
export type Gateway = operations["listGatewayHeartbeats"]["responses"]["200"]["content"]["application/json"]["data"];



// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListGatewayHeartbeatsParams = NonNullable<operations["listGatewayHeartbeats"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetControlPlaneHealthResponse = operations["getControlPlaneHealth"]["responses"]["200"]["content"]["application/json"];
export type ListGatewayHeartbeatsResponse = operations["listGatewayHeartbeats"]["responses"]["200"]["content"]["application/json"];


