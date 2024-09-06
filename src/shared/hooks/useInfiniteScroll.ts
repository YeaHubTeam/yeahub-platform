import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * @param callback - Required. Function called when the observed element's visibility changes
 * @param containerRef - Optional. Element that is used as a viewport to test the visibility of the target element. Must be an ancestor of the target element.
 * @param lastItemRef - Required. Target element to be observed.
 */

export type UseInfinityScrollOptions = {
	callback: () => void;
	containerRef?: MutableRefObject<HTMLElement>;
	lastItemRef: MutableRefObject<HTMLLIElement | null>;
};

export const useInfiniteScroll = ({
	callback,
	containerRef,
	lastItemRef,
}: UseInfinityScrollOptions) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const containerElement = containerRef ? containerRef.current : null;
		const lastItemElement = lastItemRef?.current;

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
