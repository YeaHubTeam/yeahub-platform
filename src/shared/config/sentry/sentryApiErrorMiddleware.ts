import { Middleware } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';

interface RejectedAction {
	type: string;
	error: unknown;
	[key: string]: unknown;
}

function isRejectedAction(action: unknown): action is RejectedAction {
	if (
		typeof action === 'object' &&
		action !== null &&
		'type' in action &&
		typeof (action as { type?: unknown }).type === 'string' &&
		(action as { type: string }).type.endsWith('/rejected') &&
		'error' in action
	) {
		return true;
	}
	return false;
}

export const sentryApiErrorMiddleware: Middleware = () => (next) => (action) => {
	if (isRejectedAction(action)) {
		Sentry.captureException(action.error, {
			extra: {
				context: 'RTK Query API error',
				action,
			},
		});
	}
	return next(action);
};
