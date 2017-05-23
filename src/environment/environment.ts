export const environment = {
	apiUrl: '',
	googleAnalyticsId: '',
	crashReporting: false,
	production: false,
	version: '0.0.1',
	analytics: true,
	useProxy: false,
	serviceWorkers: false,
	pageViewReportBlacklist: [],
	inactiveTimeBeforeUpdating: 30,
	timerSampleSize: 30,
	sentryProject: 'https://646a74f6ea4c4b8988e55d0b53f7e02c@sentry.io/169400',
	timeoutComponentConfig: {
		title: '',
		message: 'Are you still exploring?',
		buttonText: 'Yes!',
		delay: 60, // Time in seconds before we ask if the user is still there (Default: 120)
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
