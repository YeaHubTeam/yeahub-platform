import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void) => {
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [callback]);

	return ref;
};
