import { captureException } from '@sentry/react';
import { ReactNode, Component } from 'react';

import { setAppStateContext } from './appContext';

interface SentryErrorBoundaryProps {
	children: ReactNode;
	store?: { getState: () => unknown };
	fallback?: ReactNode;
}

interface SentryErrorBoundaryState {
	hasError: boolean;
}

export class SentryErrorBoundary extends Component<
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
		captureException(error, {
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
