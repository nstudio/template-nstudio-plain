import "./async-await"; // for async/await global
import "./bundle-config";
import "reflect-metadata";
import "nativescript-localstorage"; // for local/session storage plugin
import * as app from "tns-core-modules/application";
import * as font from "tns-core-modules/ui/styling/font";
import { Color } from "tns-core-modules/color";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { initialize as frescoInitialize } from "nativescript-fresco";
import { Sentry, SentryOptions } from "nativescript-sentry";
import { LoggingService, CLog, DatabaseService } from "./services";
import { addBottomSafeAreaForIOS } from "./utils";
import { isDevMode } from "./globals";

app.on(app.launchEvent, (args: app.ApplicationEventData) => {
  addBottomSafeAreaForIOS();

  // Android specific
  if (isAndroid) {
    /// initialize Fresco library
    frescoInitialize();
  }

  // uncomment and include your sentry config
  // const sentryDsn = '';
  // Sentry.init(sentryDsn, {
  // 	environment: 'mobile',
  // 	release: '0.1.0'
  // });
});

app.on(app.uncaughtErrorEvent, args => {
  if (isDevMode === false) {
    LoggingService.logException(args);
  }
});

// style the android statusbar on supported devices
// We don't want to override in the colors.xml for the theme right now
if (isAndroid) {
  app.android.on(app.AndroidApplication.activityResumedEvent, args => {
    const window = app.android.foregroundActivity.getWindow();
    window.setStatusBarColor(new Color("#303f9f").android);
  });
} else if (isIOS) {
  font.ios.registerFont("MaterialIcons-Regular.ttf");
  font.ios.registerFont("ionicons.ttf");
}

/**
 * Set entry point of the application
 * check for UserInfo in LOCAL-STORAGE
 */

function checkUserAuthAndStartApp() {
  try {
    //  logic here to determine where to route user on app start
    // by default, once you run the app and tap 'finish' on the slides on welcome screen
    // you have completed onboarding so no need to show the welcome slides again
    const hasViewedWelcome = DatabaseService.getItem(
      DatabaseService.KEYS.hasViewedWelcome
    );
    CLog(`*** hasViewedWelcome *** = ${hasViewedWelcome}`);
    if (hasViewedWelcome) {
      app.start({ moduleName: "screens/home/home" });
      return;
    } else {
      app.start({ moduleName: "screens/welcome/welcome" });
      return;
    }
  } catch (error) {
    // LoggingService.logException(error);
    app.start({ moduleName: "screens/welcome/welcome" });
  }
}

// execute the function
checkUserAuthAndStartApp();
