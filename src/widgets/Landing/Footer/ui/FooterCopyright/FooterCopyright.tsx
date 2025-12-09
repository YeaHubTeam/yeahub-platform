import { useScreenSize } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

export const FooterCopyright = () => {
	const { isSmallScreen } = useScreenSize();
	const currentYear = new Date().getFullYear();

	return (
		<Text
			dataTestId="FooterCopyright"
			variant={isSmallScreen ? 'body2' : 'body2-accent'}
			color="black-400"
		>
			© {currentYear} YeaHub
		</Text>
	);
};
