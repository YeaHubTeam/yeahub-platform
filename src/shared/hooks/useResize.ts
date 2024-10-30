import { useState, useEffect } from 'react';

export const useResize = () => {
	const [size, setSize] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setSize(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
};
