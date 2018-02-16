import "nativescript-localstorage";
import { LOCAL_STORAGE } from "./localstorage.service";
import { LoggingService } from "./logging.service";
import { ReflectiveInjector, Injectable, Injector } from "injection-js";

export class DatabaseService {
  public static LOCAL_STORAGE: LOCAL_STORAGE = new LOCAL_STORAGE();
  public static KEYS: IKeys = {
    /**
     * The users data object returned when querying the user GQL endpoint.
     */
    userData: "UserInfo",

    /**
     * The user's access token for the midtier calls, returned on login.
     */
    token: "token",

    /**
     * Whether or not the user has viewed or skipped the welcome slides.
     */
    hasViewedWelcome: "hasViewedWelcome"
  };

  public static setItem(key: string, value) {
    try {
      if (typeof value === "object") {
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
  public static getItem(key: string): string | any {
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
  public static removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      LoggingService.logException(error);
    }
  }

  /**
   * Deletes all data stored. *** WARNING *** - only use if you are sure you need to do this.
   */
  public static clearAllItems() {
    try {
      localStorage.clear();
    } catch (error) {
      LoggingService.logException(error);
    }
  }
}

interface IKeys {
  userData: string;
  token: string;
  hasViewedWelcome: string;
}
