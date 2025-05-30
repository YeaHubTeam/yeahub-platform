import { ButtonSkeleton } from '@/shared/ui/Button';

import { ResetQuestionStudyProgressProps } from './ResetQuestionStudyProgressButton';

export const ResetQuestionStudyProgressButtonSkeleton = ({
	variant = 'tertiary',
	width,
}: Partial<ResetQuestionStudyProgressProps> & { width?: number }) => {
	return <ButtonSkeleton variant={variant} width={width} />;
};
