import { jwtDecode } from "jwt-decode"

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "teacher" | "student" | "parent"

export interface JwtPayload {
  sub: string // user ID
  role: UserRole
  email?: string
  exp?: number // expiry (unix timestamp)
  iat?: number // issued-at
}

export interface RoleRedirectResult {
  path: string
  role: UserRole
}

// ─── Role → Dashboard route map ───────────────────────────────────────────────

const ROLE_ROUTES: Record<UserRole, string> = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
}

const FALLBACK_ROUTE = "/login"

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retrieves the JWT from localStorage (key: "token").
 * Swap the key or storage location to match your project.
 */
function getToken(): string | null {
  return localStorage.getItem("token")
}

/**
 * Returns true when the token's expiry is in the future (or has no exp field).
 */
function isTokenValid(payload: JwtPayload): boolean {
  if (!payload.exp) return true // no expiry → treat as valid
  return Date.now() < payload.exp * 1000
}

/**
 * Decodes the JWT and returns its payload, or null if decoding fails / token
 * is missing or expired.
 */
export function decodeToken(): JwtPayload | null {
  const token = getToken()
  if (!token) return null

  try {
    const payload = jwtDecode<JwtPayload>(token)
    if (!isTokenValid(payload)) {
      console.warn("[roleRedirect] Token has expired.")
      return null
    }
    return payload
  } catch (err) {
    console.error("[roleRedirect] Failed to decode token:", err)
    return null
  }
}

// ─── Core redirect logic ──────────────────────────────────────────────────────

/**
 * Resolves the redirect path for the authenticated user based on their role.
 *
 * @returns `RoleRedirectResult` on success, or `null` if the user is
 *          unauthenticated / token is invalid.
 *
 * @example
 * const result = getRoleRedirect();
 * if (result) {
 *   navigate(result.path);
 * } else {
 *   navigate("/login");
 * }
 */
export function getRoleRedirect(): RoleRedirectResult | null {
  const payload = decodeToken()
  if (!payload) return null

  const { role } = payload
  const path = ROLE_ROUTES[role]

  if (!path) {
    console.error(
      `[roleRedirect] Unknown role: "${role}". Redirecting to login.`
    )
    return null
  }

  return { path, role }
}

/**
 * Returns the dashboard path for a given role without reading from the token.
 * Useful for programmatic navigation when you already have the role string.
 */
export function getPathForRole(role: UserRole): string {
  return ROLE_ROUTES[role] ?? FALLBACK_ROUTE
}

/**
 * Guard utility — returns true only if the decoded token's role matches one
 * of the allowed roles.
 *
 * @example
 * if (!hasRequiredRole(["admin", "teacher"])) {
 *   navigate("/unauthorized");
 * }
 */
export function hasRequiredRole(allowedRoles: UserRole[]): boolean {
  const payload = decodeToken()
  if (!payload) return false
  return allowedRoles.includes(payload.role)
}

/**
 * Returns the currently authenticated user's role, or null if unauthenticated.
 */
export function getCurrentRole(): UserRole | null {
  return decodeToken()?.role ?? null
}
