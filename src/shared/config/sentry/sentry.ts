import {
	browserTracingIntegration,
	captureException,
	init,
	replayIntegration,
	setTag,
} from '@sentry/react';

export function initSentry() {
	if (!process.env.SENTRY_DSN) {
		// eslint-disable-next-line no-console
		console.warn('Sentry DSN не настроен. Мониторинг ошибок отключен.');
		return;
	}

	try {
		init({
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV || 'development',
			integrations: [
				browserTracingIntegration(),
				replayIntegration({
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

				if (event.level === 'info') return null;

				const sensitiveHeaders = ['authorization', 'cookie', 'x-csrf-token'];
				const sensitiveExtraFields = ['password', 'token', 'newPassword', 'confirmPassword'];

				const cookies =
					event.request?.cookies && typeof event.request.cookies === 'object'
						? Object.fromEntries(
								Object.keys(event.request.cookies).map((key) => [key, '[Filtered]']),
							)
						: event.request?.cookies;

				const headers = event.request?.headers
					? {
							...event.request.headers,
							...Object.fromEntries(
								sensitiveHeaders
									.filter((header) => event.request?.headers?.[header])
									.map((header) => [header, '[Filtered]']),
							),
						}
					: event.request?.headers;

				const data = event.request?.data
					? typeof event.request.data === 'string'
						? '[Filtered]'
						: typeof event.request.data === 'object' && event.request.data !== null
							? Object.fromEntries(
									Object.keys(event.request.data).map((key) => [key, '[Filtered]']),
								)
							: event.request.data
					: event.request?.data;

				const extra =
					event.extra && typeof event.extra === 'object'
						? {
								...event.extra,
								...Object.fromEntries(
									Object.keys(event.extra)
										.filter((key) => sensitiveExtraFields.includes(key.toLowerCase()))
										.map((key) => [key, '[Filtered]']),
								),
							}
						: event.extra;

				return {
					...event,
					request: event.request
						? {
								...event.request,
								cookies,
								headers,
								data,
								query_string: event.request.query_string
									? '[Filtered]'
									: event.request.query_string,
							}
						: event.request,
					extra,
				};
			},
		});

		setTag('device', getDeviceType());
		setTag('os', getOSVersion());
		setTag('session_id', getSessionId());

		window.onerror = (_unused, source, lineno, colno, error: unknown) => {
			if (error instanceof Error) {
				captureException(error, {
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
			captureException(event.reason, {
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
