import { ButtonSkeleton } from '@/shared/ui/Button';

import { LearnQuestionButtonProps } from './LearnQuestionButton';

export const LearnQuestionButtonSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<LearnQuestionButtonProps> & { width?: number }) => {
	return <ButtonSkeleton variant={variant} width={width} />;
};
