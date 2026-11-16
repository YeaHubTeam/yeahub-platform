import { RefObject, useEffect, useRef } from 'react';

export type UseInfinityScrollOptions = {
	callback: () => void;
	containerRef?: RefObject<HTMLElement | null>;
	lastItemRef: RefObject<HTMLElement | null>;
};

export const useInfiniteScroll = ({
	callback,
	containerRef,
	lastItemRef,
}: UseInfinityScrollOptions) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const containerElement = containerRef ? containerRef.current : null;
		const lastItemElement = lastItemRef.current;

		if (!lastItemElement) {
			return;
		}

		const options = {
			root: containerElement,
			rootMargin: '0px',
			threshold: 1,
		};
		observer.current = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				callback();
			}
		}, options);

		observer.current.observe(lastItemElement);

		return () => {
			if (observer.current && lastItemElement) {
				observer.current.unobserve(lastItemElement);
			}
		};
	}, [callback, containerRef, lastItemRef]);
};
