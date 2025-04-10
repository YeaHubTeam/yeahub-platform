import React, { ErrorInfo } from 'react';

interface Props {
	children?: React.ReactNode;
	fallback?: React.ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
	state = { hasError: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Caught error by ErrorBoundary:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}
