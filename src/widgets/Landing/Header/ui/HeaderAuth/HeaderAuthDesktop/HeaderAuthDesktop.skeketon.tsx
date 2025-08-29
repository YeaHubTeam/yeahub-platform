import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const HeaderAuthDesktopSkeleton = () => {
	return (
		<Flex
			dataTestId={'HeaderAuthDesktopSkeleton_Wrapper'}
			justify="between"
			align="center"
			gap="26"
		>
			<ButtonSkeleton dataTestId={'ButtonSkeleton'} size="small" width={40} />
			<ButtonSkeleton dataTestId={'ButtonSkeleton'} size="large" width={171} />
		</Flex>
	);
};
