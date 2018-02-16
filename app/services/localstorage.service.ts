import 'nativescript-localstorage';
import { LoggingService } from './logging.service';

// tslint:disable-next-line:class-name
export class LOCAL_STORAGE {
	public setItem(key: string, value) {
		try {
			if (typeof value === 'object') {
				JSON.stringify(value);
			}
			localStorage.setItem(key, value);
			return;
		} catch (error) {
			LoggingService.logException(error);
		}
	}

	/**
	 * Get an item from localStorage.
	 * @param key
	 */
	public getItem(key: string) {
		try {
			const result = localStorage.getItem(key);
			return result;
		} catch (error) {
			LoggingService.logException(error);
		}
	}

	/**
	 * Delete an item from localStorage.
	 * @param key
	 */
	public removeItem(key: string) {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			LoggingService.logException(error);
		}
	}

	/**
	 * Deletes all data stored. *** WARNING *** - only use if you are sure you need to do this.
	 */
	public clearAllItems() {
		try {
			localStorage.clear();
		} catch (error) {
			LoggingService.logException(error);
		}
	}
}
