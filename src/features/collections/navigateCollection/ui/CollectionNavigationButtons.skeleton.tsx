import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { CollectionNavigationButtonsProps } from './CollectionNavigationButtons';

export const CollectionNavigationButtonsSkeleton = ({
	width,
}: Partial<CollectionNavigationButtonsProps> & {
	width?: number;
}) => {
	return (
		<Flex justify="center" gap="20">
			<ButtonSkeleton width={width} />
			<ButtonSkeleton width={width} />
		</Flex>
	);
};
