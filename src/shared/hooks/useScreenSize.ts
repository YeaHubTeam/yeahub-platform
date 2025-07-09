import { useMediaQuery } from 'react-responsive';

export const useScreenSize = () => {
	const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
	const isDesktopS = useMediaQuery({ query: '(min-width: 1200px) and (max-width: 1439px)' });
	const isLargeScreen = isDesktop || isDesktopS;
	const isSmallScreen = !isLargeScreen;
	const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1199px)' });
	const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
	const isMobileS = useMediaQuery({ query: '(max-width: 480px)' });
	const isMobileM = useMediaQuery({ query: '(max-width: 567px)' });

	return {
		isDesktop,
		isDesktopS,
		isLargeScreen,
		isSmallScreen,
		isLaptop,
		isTablet,
		isMobile,
		isMobileS,
		isMobileM,
	};
};
