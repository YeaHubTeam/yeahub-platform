import { addBreadcrumb, setContext } from '@sentry/react';

export function addRouteBreadcrumb(pathname: string) {
	addBreadcrumb({
		category: 'navigation',
		message: `Переход на маршрут: ${pathname}`,
		level: 'info',
	});
	setContext('current_route', { pathname });
}

export function setAppStateContext(state: unknown) {
	setContext('app_state', state as Record<string, unknown>);
}
