import { useLayoutEffect, useRef } from 'react';

export const useScrollToTop = <T extends HTMLElement, U>(deps: U) => {
	const ref = useRef<T | null>(null);

	useLayoutEffect(() => {
		const element = ref.current;

		if (element && element?.parentElement) {
			element.parentElement.scrollIntoView({ block: 'start' });
		} else {
			window.scrollTo(0, 0);
		}
	}, [deps, ref]);

	return { ref };
};
