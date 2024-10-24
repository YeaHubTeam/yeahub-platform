import * as Sentry from '@sentry/react';
import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromChildren,
	matchRoutes,
	useLocation,
	useNavigationType,
} from 'react-router-dom';

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		Sentry.reactRouterV6BrowserTracingIntegration({
			useEffect: React.useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes,
		}),
	],
	tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);
export default sentryCreateBrowserRouter;
