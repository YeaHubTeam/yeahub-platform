import { useLayoutEffect, useState } from 'react';

interface UseWindowSizeProps {
	width: number;
	height: number;
}

export const useWindowSize = (): UseWindowSizeProps => {
	const [size, setSize] = useState<UseWindowSizeProps>({ width: 0, height: 0 });

	useLayoutEffect(() => {
		function updateSize() {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		}

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return { width: size.width, height: size.height };
};
