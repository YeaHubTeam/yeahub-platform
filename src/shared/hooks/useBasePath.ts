import { useLocation } from 'react-router-dom';

export function useBasePath(): string {
	const location = useLocation();
	const segments = location.pathname.split('/').filter(Boolean);

	// Удаляем последний сегмент (slug)
	if (segments.length > 1) {
		segments.pop();
	}

	return `/${segments.join('/')}`;
}
