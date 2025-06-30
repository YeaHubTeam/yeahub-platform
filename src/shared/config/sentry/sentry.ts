import * as Sentry from '@sentry/react';

export function initSentry() {
	if (!process.env.SENTRY_DSN) {
		// eslint-disable-next-line no-console
		console.warn('Sentry DSN не настроен. Мониторинг ошибок отключен.');
		return;
	}

	try {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV || 'development',
			integrations: [
				Sentry.browserTracingIntegration(),
				Sentry.replayIntegration({
					maskAllText: true,
					blockAllMedia: true,
				}),
			],
			tracePropagationTargets: [
				'localhost',
				/^https:\/\/api\.yeahub\.ru(\/)?$/,
				/^https:\/\/api\.test\.yeahub\.ru(\/)?$/,
				/^https:\/\/platform\.yeahub\.ru(\/)?$/,
				/^https:\/\/platform\.test\.yeahub\.ru(\/)?$/,
			],
			tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
			replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
			replaysOnErrorSampleRate: 1.0,
			beforeSend(event) {
				if (event.exception) {
					const isAdBlocker = event.exception.values?.some((exception) =>
						exception.value?.includes('adblock'),
					);
					if (isAdBlocker) {
						// eslint-disable-next-line no-console
						console.warn('Обнаружен блокировщик рекламы');
						return null;
					}
				}

				const cookies = event.request?.cookies;
				if (cookies && typeof cookies === 'object') {
					Object.keys(cookies).forEach((key) => {
						cookies[key] = '[Filtered]';
					});
				}

				if (event.request && event.request.headers) {
					const sensitiveHeaders = ['authorization', 'cookie', 'x-csrf-token'];
					sensitiveHeaders.forEach((header) => {
						if (event.request!.headers![header]) {
							event.request!.headers![header] = '[Filtered]';
						}
					});
				}

				if (event.request?.query_string) {
					event.request.query_string = '[Filtered]';
				}

				if (event.request?.data) {
					if (typeof event.request.data === 'string') {
						event.request.data = '[Filtered]';
					} else if (typeof event.request.data === 'object' && event.request.data !== null) {
						Object.keys(event.request.data).forEach((key) => {
							event.request!.data[key] = '[Filtered]';
						});
					}
				}

				const extra = event.extra;
				if (extra && typeof extra === 'object') {
					const sensitiveFields = ['password', 'token', 'newPassword', 'confirmPassword'];
					Object.keys(extra).forEach((key) => {
						if (sensitiveFields.includes(key.toLowerCase())) {
							extra[key] = '[Filtered]';
						}
					});
				}

				if (event.level === 'info') return null;
				return event;
			},
		});

		Sentry.setTag('device', getDeviceType());
		Sentry.setTag('os', getOSVersion());
		Sentry.setTag('session_id', getSessionId());

		window.onerror = (_unused, source, lineno, colno, error: unknown) => {
			if (error instanceof Error) {
				Sentry.captureException(error, {
					extra: {
						source,
						lineno,
						colno,
					},
				});
			}
			return false;
		};

		window.onunhandledrejection = (event: PromiseRejectionEvent) => {
			Sentry.captureException(event.reason, {
				extra: {
					type: 'unhandledrejection',
				},
			});
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Ошибка инициализации Sentry:', error);
	}
}

function getDeviceType() {
	const ua = navigator.userAgent;
	if (/Mobi|Android/i.test(ua)) return 'mobile';
	if (/Tablet|iPad/i.test(ua)) return 'tablet';
	return 'desktop';
}

function getOSVersion() {
	const platform = navigator.platform || '';
	const userAgent = navigator.userAgent || '';
	if (/Win/i.test(platform)) return 'Windows';
	if (/Mac/i.test(platform)) return 'macOS';
	if (/Linux/i.test(platform)) return 'Linux';
	if (/Android/i.test(userAgent)) return 'Android';
	if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
	return 'unknown';
}

function getSessionId() {
	let sessionId = sessionStorage.getItem('sentry_session_id');
	if (!sessionId) {
		sessionId = Math.random().toString(36).substring(2) + Date.now();
		sessionStorage.setItem('sentry_session_id', sessionId);
	}
	return sessionId;
}
