import { useCallback, useRef, useEffect } from 'react';

type Timer = ReturnType<typeof setTimeout>;

export function useDebounce<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
	const debounceTimerRef = useRef<Timer | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	return useCallback(
		(...args: T) => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
			debounceTimerRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		},
		[callback, delay],
	);
}
