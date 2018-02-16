/**
 * Base Api Url for backend
 */
export const BaseUrl: string = '';

/**
 * The default timeout of HTTP calls.
 */
export const HttpTimeout = 7500;

/**
 * Boolean flag to indicate we are in dev mode.
 * Mostly used in our LoggingService to prevent pinging Sentry.io
 * when we are developing.
 */
export const isDevMode: boolean = true;
