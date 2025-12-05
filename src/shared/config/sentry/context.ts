import { setUser, setTag, setContext } from '@sentry/react';

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
		setUser({
			id: user.id,
			email: user.email,
		});
		if (user.role) {
			setTag('user.role', user.role);
		}
		if (user.metadata) {
			setContext('user_metadata', user.metadata);
		}
	} else {
		setUser(null);
		setTag('user.role', undefined);
		setContext('user_metadata', null);
	}
}
