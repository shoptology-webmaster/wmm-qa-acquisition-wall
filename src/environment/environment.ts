export const environment = {
	appShortName: 'acquisitionWall',
	apiUrl: 'https://www.walmartmuseum.com/api/acquisition',
	googleAnalyticsId: 'UA-73912844-2',
	crashReporting: true,
	cacheAssets: true,
	cacheMode: 'parallel',
	debugAvailable: true,
	production: true,
	version: '2.1.0',
	analytics: true,
	useProxy: false,
	serviceWorkers: false,
	pageViewReportBlacklist: [],
	inactiveTimeBeforeUpdating: 10, // In minutes
	timerSampleSize: 30,
	sentryProject: 'http://646a74f6ea4c4b8988e55d0b53f7e02c@sentry.io/169400',
	heartbeatHost: 'http://shp-device-monitor.herokuapp.com',
	timeoutComponentConfig: {
		title: '',
		message: 'Are you still exploring?',
		buttonText: 'Yes!',
		delay: 30, // Time in seconds before we ask if the user is still there (Default: 120)
		countdown: 10, // Time in seconds to countdown after the alert has popped up (Default: 15)
		excludedPages: ['PassivePage', 'SetupPage', 'LoadPage']
	},
	setupInputs: [
		{
			name: 'kioskNumber',
			display_name: 'Kiosk Number',
			type: 'text'
		}
	]
}
