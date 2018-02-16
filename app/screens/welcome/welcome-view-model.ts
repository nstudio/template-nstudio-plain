// core
import { Observable, EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { topmost, NavigationEntry } from 'tns-core-modules/ui/frame';
import { isIOS } from 'tns-core-modules/platform';
import { ObservableProperty, EventListeners, EventInfo } from '../../utils';
import * as appversion from 'nativescript-appversion';
import { DatabaseService } from '../../services';

export class WelcomeViewModel extends Observable {
	@ObservableProperty() public APP_VERSION: string;

	constructor(page: Page) {
		super();

		if (isIOS) {
			const navigationBar = topmost().ios.controller.navigationBar;
			navigationBar.barStyle = UIBarStyle.BlackTranslucent;
		}

		this.APP_VERSION = appversion.getVersionNameSync();
	}

	public onFinishTap() {
		DatabaseService.setItem(DatabaseService.KEYS.hasViewedWelcome, true);

		const navEntry: NavigationEntry = {
			moduleName: 'screens/home/home',
			animated: true,
			clearHistory: true
		};
		topmost().navigate(navEntry);
	}
}
