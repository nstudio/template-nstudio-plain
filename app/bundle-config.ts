if ((global as any).TNS_WEBPACK) {
	// registers tns-core-modules UI framework modules
	// tslint:disable-next-line:no-var-requires
	require('bundle-entry-points');

	// register application modules
	// This will register each `page` postfixed xml, css, js, ts, scss etc. in the app/ folder
	const context = (require as any).context(
		'~/',
		true,
		/(page|fragment)\.(xml|css|js|ts|scss|less|sass)$/
	);
	global.registerWebpackModules(context);
}
