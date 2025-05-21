import * as Sentry from '@sentry/react';

export function addRouteBreadcrumb(pathname: string) {
	Sentry.addBreadcrumb({
		category: 'navigation',
		message: `Переход на маршрут: ${pathname}`,
		level: 'info',
	});
	Sentry.setContext('current_route', { pathname });
}

export function setAppStateContext(state: unknown) {
	Sentry.setContext('app_state', state as Record<string, unknown>);
}
