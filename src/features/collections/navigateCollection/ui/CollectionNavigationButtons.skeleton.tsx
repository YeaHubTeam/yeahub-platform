import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { CollectionNavigationButtonsProps } from './CollectionNavigationButtons';

export const CollectionNavigationButtonsSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<CollectionNavigationButtonsProps> & {
	width?: number;
}) => {
	return (
		<Flex justify="center" gap="20">
			<ButtonSkeleton variant={variant} width={width} />
			<ButtonSkeleton variant={variant} width={width} />
		</Flex>
	);
};
