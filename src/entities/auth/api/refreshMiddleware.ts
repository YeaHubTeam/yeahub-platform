import { createListenerMiddleware } from '@reduxjs/toolkit';

import { apiAccessTokenIsBrokenEvent } from '@/shared/config/api/apiAccessTokenIsBrokenEvent';

import { authApi } from './authApi';

export const refreshMiddleware = createListenerMiddleware();

const refreshMiddlewareStartListening = refreshMiddleware.startListening;

refreshMiddlewareStartListening({
	actionCreator: apiAccessTokenIsBrokenEvent,
	effect: async (_, api) => {
		api.dispatch(authApi.endpoints.refresh.initiate());
	},
});
