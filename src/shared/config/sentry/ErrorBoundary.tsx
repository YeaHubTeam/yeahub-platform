import * as Sentry from '@sentry/react';
import React from 'react';

import { setAppStateContext } from './appContext';

interface SentryErrorBoundaryProps {
	children: React.ReactNode;
	store?: { getState: () => unknown };
	fallback?: React.ReactNode;
}

interface SentryErrorBoundaryState {
	hasError: boolean;
}

export class SentryErrorBoundary extends React.Component<
	SentryErrorBoundaryProps,
	SentryErrorBoundaryState
> {
	constructor(props: SentryErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): SentryErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		if (this.props.store) {
			setAppStateContext(this.props.store.getState());
		}
		Sentry.captureException(error, {
			extra: {
				componentStack: errorInfo.componentStack,
			},
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div>Произошла непредвиденная ошибка. Пожалуйста, перезагрузите страницу.</div>
				)
			);
		}
		return this.props.children;
	}
}
