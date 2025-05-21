// src/shared/config/sentry/sentry.ts
import * as Sentry from '@sentry/react';

/**
 * Инициализация Sentry с расширенной конфигурацией
 *
 * Основные компоненты конфигурации:
 * 1. Базовые настройки (DSN, environment, release)
 * 2. Интеграции для отслеживания ошибок и производительности
 * 3. Настройки sampling rates для оптимизации производительности
 * 4. Обработка блокировщиков рекламы
 * 5. Фильтрация чувствительных данных
 */
export function initSentry() {
	// Проверяем доступность Sentry перед инициализацией
	if (!process.env.SENTRY_DSN) {
		// Временно оставляем для отладки, можно убрать после настройки
		console.warn('Sentry DSN не настроен. Мониторинг ошибок отключен.');
		return;
	}

	try {
		Sentry.init({
			// Базовые настройки
			dsn: process.env.SENTRY_DSN,
			environment: process.env.NODE_ENV || 'development',

			// Интеграции для отслеживания
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

			// Фильтрация и обработка событий перед отправкой
			beforeSend(event) {
				// Проверка на блокировщик рекламы
				if (event.exception) {
					const isAdBlocker = event.exception.values?.some((exception) =>
						exception.value?.includes('adblock'),
					);
					if (isAdBlocker) {
						console.warn('Обнаружен блокировщик рекламы');
						return null;
					}
				}

				// --- Расширенная фильтрация чувствительных данных ---

				// Маскируем cookies
				const cookies = event.request?.cookies;
				if (cookies && typeof cookies === 'object') {
					Object.keys(cookies).forEach((key) => {
						cookies[key] = '[Filtered]';
					});
				}

				// Маскируем чувствительные заголовки
				if (event.request && event.request.headers) {
					const sensitiveHeaders = ['authorization', 'cookie', 'x-csrf-token'];
					sensitiveHeaders.forEach((header) => {
						if (event.request!.headers![header]) {
							event.request!.headers![header] = '[Filtered]';
						}
					});
				}

				// Маскируем query-параметры
				if (event.request?.query_string) {
					event.request.query_string = '[Filtered]';
				}

				// Маскируем содержимое форм (POST body)
				if (event.request?.data) {
					// Если это строка (например, JSON или form-urlencoded)
					if (typeof event.request.data === 'string') {
						event.request.data = '[Filtered]';
					} else if (
						event.request &&
						typeof event.request.data === 'object' &&
						event.request.data !== null
					) {
						Object.keys(event.request.data).forEach((key) => {
							event.request!.data[key] = '[Filtered]';
						});
					}
				}

				// Маскируем user input, если оно попало в event.extra
				const extra = event.extra;
				if (extra && typeof extra === 'object') {
					const sensitiveFields = ['password', 'token', 'newPassword', 'confirmPassword'];
					Object.keys(extra).forEach((key) => {
						if (sensitiveFields.includes(key.toLowerCase())) {
							extra[key] = '[Filtered]';
						}
					});
				}

				// Фильтрация событий уровня info
				if (event.level === 'info') return null;

				return event;
			},
		});

		// Установка кастомных тегов
		Sentry.setTag('device', getDeviceType());
		Sentry.setTag('os', getOSVersion());
		Sentry.setTag('session_id', getSessionId());

		// Глобальный обработчик необработанных ошибок
		window.onerror = (_unused, source, lineno, colno, error: unknown) => {
			if (error instanceof Error) {
				const eventId = Sentry.captureException(error, {
					extra: {
						source,
						lineno,
						colno,
					},
				});
				Sentry.showReportDialog({ eventId });
			}
			return false;
		};

		// Глобальный обработчик необработанных промисов
		window.onunhandledrejection = (event: PromiseRejectionEvent) => {
			const eventId = Sentry.captureException(event.reason, {
				extra: {
					type: 'unhandledrejection',
				},
			});
			Sentry.showReportDialog({ eventId });
		};
	} catch (error) {
		// Временно оставляем для отладки, можно убрать после настройки
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
