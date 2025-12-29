import { RefObject, useEffect, useState } from 'react';

export const useTruncation = (ref: RefObject<HTMLElement>, variant: 'row' | 'column'): boolean => {
	const [isTruncated, setIsTruncated] = useState(false);

	const checkTruncation = (): void => {
		if (ref.current)
			setIsTruncated(
				variant === 'row'
					? ref.current.scrollWidth > ref.current.clientWidth
					: ref.current.scrollHeight > ref.current.clientHeight,
			);
	};

	const debounce = (func: () => void, delay: number): (() => void) => {
		let timerId: NodeJS.Timeout | undefined;

		return () => {
			if (timerId) clearTimeout(timerId);

			timerId = setTimeout(() => {
				func();
			}, delay);
		};
	};

	const debouncedCheckTruncation = debounce(checkTruncation, 200);

	useEffect(() => {
		debouncedCheckTruncation();
		window.addEventListener('resize', debouncedCheckTruncation);

		return () => window.removeEventListener('resize', debouncedCheckTruncation);
	}, [debouncedCheckTruncation]);

	return isTruncated;
};
