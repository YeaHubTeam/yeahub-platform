import * as Sentry from '@sentry/react';

export function initSentry() {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
		tracesSampleRate: 1.0,
		tracePropagationTargets: [
			'localhost',
			/^https:\/\/api\.yeahub\.ru(\/)?$|^https:\/\/api\.test\.yeahub\.ru(\/)?$|^https:\/\/platform\.yeahub\.ru(\/)?$|^https:\/\/platform\.test\.yeahub\.ru(\/)?$/,
		],
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
		beforeSend(event) {
			if (event.level === 'info') return null;
			return event;
		},
	});
}
