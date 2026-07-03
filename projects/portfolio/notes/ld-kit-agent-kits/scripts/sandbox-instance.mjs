/**
 * Single source of truth for the local test instance path.
 *
 * `npm run test:local` (scripts/local-test.mjs) scaffolds a kit instance via
 * the real living-design-lite skill into this directory. build-portable,
 * build-context, and extract-guidelines live-sync their output into it when
 * it exists, so `npm run test:local:dev` gives a live inner loop against the
 * same instance the outer e2e loop created. See TESTING.md.
 */
export const SANDBOX_INSTANCE_REL = '.sandbox/e2e/instance/demo-app';
