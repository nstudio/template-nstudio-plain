import { Sentry, SentryOptions } from 'nativescript-sentry';
import { isDevMode } from '../globals';

export class LoggingUtil {
	public static debug: boolean = true;
}

export const CLog = (...args) => {
	if (LoggingUtil.debug) {
		console.log(args);
	}
};

// tslint:disable-next-line:max-classes-per-file
export class LoggingService {
	/**
	 * Will console.log() the error argument. If devmode is false then we capture
	 * the exception with Sentry logging.
	 * @param err
	 */
	public static logException(exception: Error, options: SentryOptions = {}) {
		console.log(exception);

		if (isDevMode) {
			return;
		}

		Sentry.captureException(exception, options);
	}

	public static logMessage(message: string, options: SentryOptions = {}) {
		console.log(message);
		if (isDevMode) {
			return;
		}
		Sentry.captureMessage(message, options);
	}
}
