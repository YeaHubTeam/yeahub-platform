import * as Sentry from '@sentry/react';

export interface UserContext {
	id: string;
	email?: string;
	role?: string;
	metadata?: Record<string, unknown>;
}

export function setUserContext(user: UserContext | null) {
	// eslint-disable-next-line no-console
	console.log('setUserContext called', user);
	if (user) {
		Sentry.setUser({
			id: user.id,
			email: user.email,
		});
		if (user.role) {
			Sentry.setTag('user.role', user.role);
		}
		if (user.metadata) {
			Sentry.setContext('user_metadata', user.metadata);
		}
	} else {
		Sentry.setUser(null);
		Sentry.setTag('user.role', undefined);
		Sentry.setContext('user_metadata', null);
	}
}
