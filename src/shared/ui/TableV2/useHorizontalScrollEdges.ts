import { useEffect, useRef } from 'react';

const setShadowOpacity = (shadow: HTMLDivElement | null, visible: boolean) => {
	if (!shadow) {
		return;
	}

	shadow.style.opacity = visible ? '1' : '0';
};

const observePinnedOffset = (
	root: HTMLElement,
	side: 'left' | 'right',
	shadow: HTMLDivElement | null,
	cleanups: Array<() => void>,
) => {
	const cell = root.querySelector<HTMLElement>(`[data-pinned="${side}"]`);

	if (!cell || !shadow) {
		return;
	}

	const updateOffset = () => {
		shadow.style[side] = `${cell.offsetWidth}px`;
	};

	updateOffset();

	const resizeObserver = new ResizeObserver(updateOffset);
	resizeObserver.observe(cell);
	cleanups.push(() => resizeObserver.disconnect());
};

export const useHorizontalScrollEdges = (active: boolean) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const leftSentinelRef = useRef<HTMLDivElement>(null);
	const rightSentinelRef = useRef<HTMLDivElement>(null);
	const leftShadowRef = useRef<HTMLDivElement>(null);
	const rightShadowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = scrollRef.current;
		const leftShadow = leftShadowRef.current;
		const rightShadow = rightShadowRef.current;
		const leftSentinel = leftSentinelRef.current;
		const rightSentinel = rightSentinelRef.current;

		if (!root || !active || typeof IntersectionObserver === 'undefined') {
			setShadowOpacity(leftShadow, false);
			setShadowOpacity(rightShadow, false);
			return;
		}

		const cleanups: Array<() => void> = [];

		observePinnedOffset(root, 'left', leftShadow, cleanups);
		observePinnedOffset(root, 'right', rightShadow, cleanups);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const shadow = entry.target === leftSentinel ? leftShadow : rightShadow;

					setShadowOpacity(shadow, !entry.isIntersecting);
				});
			},
			{ root, threshold: 0 },
		);

		if (leftSentinel) {
			observer.observe(leftSentinel);
		}

		if (rightSentinel) {
			observer.observe(rightSentinel);
		}

		cleanups.push(() => observer.disconnect());

		return () => {
			cleanups.forEach((cleanup) => cleanup());
			setShadowOpacity(leftShadow, false);
			setShadowOpacity(rightShadow, false);
		};
	}, [active]);

	return {
		scrollRef,
		leftSentinelRef,
		rightSentinelRef,
		leftShadowRef,
		rightShadowRef,
	};
};
