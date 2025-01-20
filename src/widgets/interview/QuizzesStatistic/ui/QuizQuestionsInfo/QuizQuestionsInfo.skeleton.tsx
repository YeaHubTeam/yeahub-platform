import { PercentsInfoPieSkeleton } from '@/shared/ui/PercentsInfoPie';

import { QuizQuestionsInfoProps } from './QuizQuestionsInfo';

export const QuizQuestionsInfoSkeleton = ({ className }: QuizQuestionsInfoProps) => {
	return <PercentsInfoPieSkeleton className={className} attemptStatsLength={2} />;
};
