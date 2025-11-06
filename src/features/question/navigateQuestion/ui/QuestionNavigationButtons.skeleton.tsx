import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { QuestionNavigationButtonsProps } from './QuestionNavigationButtons';

export const QuestionNavigationButtonsSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<QuestionNavigationButtonsProps> & {
	width?: number;
}) => {
	return (
		<Flex justify="center" gap="20">
			<ButtonSkeleton variant={variant} width={width} />
			<ButtonSkeleton variant={variant} width={width} />
		</Flex>
	);
};
