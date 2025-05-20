import { useScreenSize } from '@/shared/hooks';
import { Text } from '@/shared/ui/Text';

export const FooterCopyright = () => {
	const { isSmallScreen } = useScreenSize();
	const currentYear = new Date().getFullYear();

	return (
		<Text variant={isSmallScreen ? 'body2' : 'body2-accent'} color="black-400">
			© {currentYear} {'YeaHub'}
		</Text>
	);
};
