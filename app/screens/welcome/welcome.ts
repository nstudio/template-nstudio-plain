import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { WelcomeViewModel } from './welcome-view-model';

export function onLoaded(args: EventData) {
	const page = args.object as Page;
	page.bindingContext = new WelcomeViewModel(page);
}
