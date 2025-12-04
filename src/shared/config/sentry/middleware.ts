import { Middleware } from '@reduxjs/toolkit';
import { addBreadcrumb } from '@sentry/react';

import { setUserContext, UserContext } from './context';

export const sentryMiddleware: Middleware = (store) => (next) => (action) => {
	const loginActionTypes = ['auth/login/fulfilled', 'profileInfo/fetch/fulfilled'];
	const logoutActionTypes = ['auth/logout/fulfilled'];
	const updateProfileActionTypes = ['profileInfo/update/fulfilled'];

	const actionWithType = action as { type?: string; payload?: unknown };

	if (actionWithType.type && !actionWithType.type.startsWith('@@')) {
		addBreadcrumb({
			category: 'redux.action',
			message: actionWithType.type,
			level: 'info',
			data: {
				...(actionWithType.payload ? { payload: actionWithType.payload } : {}),
			},
		});
	}

	if (
		actionWithType.type &&
		(loginActionTypes.includes(actionWithType.type) ||
			updateProfileActionTypes.includes(actionWithType.type))
	) {
		const state = store.getState();
		const profile = state.profile;
		if (profile && profile.id) {
			const userContext: UserContext = {
				id: String(profile.id),
				email: profile.isEmailVerified ? profile.email : undefined,
				role: profile.role || 'unknown',
				metadata: {
					tariff: profile.tariff || 'unknown',
					company: profile.company || 'unknown',
				},
			};
			try {
				setUserContext(userContext);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error setting user context:', error);
			}
		}
	}

	if (actionWithType.type && logoutActionTypes.includes(actionWithType.type)) {
		setUserContext(null);
	}

	return next(action);
};
