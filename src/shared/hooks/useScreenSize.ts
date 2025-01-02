import { useMediaQuery } from 'react-responsive';

export const useScreenSize = () => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
	const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1439px)' });
	const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
	const isMobileS = useMediaQuery({ query: '(max-width: 360px)' });

	return {
		isDesktop,
		isLaptop,
		isTablet,
		isMobile,
		isMobileS,
	};
};
