import { useScreenSize } from '@/shared/hooks';
import { CardSkeleton } from '@/shared/ui/Card';

import { PreviewActiveQuizSkeleton } from '../PreviewActiveQuiz/PreviewActiveQuiz.skeleton';

import { InterviewPreparationProps } from './InterviewPreparation';

export const InterviewPreparationSkeleton = ({ className }: InterviewPreparationProps) => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton
			className={className}
			title="title"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
			withShadow={!isMobile}
			isTitleCenter={isMobile}
		>
			<PreviewActiveQuizSkeleton />
		</CardSkeleton>
	);
};
