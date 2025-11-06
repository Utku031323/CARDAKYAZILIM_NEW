import * as Sentry from '@sentry/node';

/**
 * Sentry Error Tracking Configuration
 *
 * This file initializes and configures the Sentry SDK.
 * Sentry automatically tracks and reports errors in the application.
 *
 * Usage:
 * - Development: Sentry disabled (no DSN)
 * - Production: Sentry enabled (DSN configured)
 */

// Get Sentry DSN from environment variables
const SENTRY_DSN = process.env.SENTRY_DSN;
const NODE_ENV = process.env.NODE_ENV || 'development';
const RELEASE_VERSION = process.env.SENTRY_RELEASE || '1.0.0';

/**
 * Initialize Sentry
 *
 * If SENTRY_DSN environment variable is set, Sentry is enabled.
 * Otherwise, Sentry remains disabled (in development environment).
 */
if (SENTRY_DSN) {
  Sentry.init({
    // Sentry DSN (Data Source Name)
    // This is the unique identifier required to send errors to Sentry
    dsn: SENTRY_DSN,

    // Environment name (development, production, etc.)
    environment: NODE_ENV,

    // Application version
    release: RELEASE_VERSION,

    // Trace sampling rate (0.0 - 1.0)
    // 1.0 = track all operations (0.1 - 0.5 recommended for production)
    tracesSampleRate: NODE_ENV === 'production' ? 0.1 : 1.0,

    // Debug mode (true in development, false in production)
    debug: NODE_ENV === 'development',

    // Maximum number of breadcrumbs
    maxBreadcrumbs: 50,

    // Attach stack trace to all messages
    attachStacktrace: true,

    // Error reporting options
    includeLocalVariables: NODE_ENV === 'development',
  });

  console.log('✅ Sentry successfully initialized');
  console.log(`   DSN: ${SENTRY_DSN.substring(0, 30)}...`);
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Release: ${RELEASE_VERSION}`);
} else {
  console.log('⚠️  Sentry DSN not configured. Error tracking disabled.');
  console.log('   Set SENTRY_DSN environment variable to enable Sentry in production.');
}

export default Sentry;

