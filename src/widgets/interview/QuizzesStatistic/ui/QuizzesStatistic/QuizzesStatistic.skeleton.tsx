import { PercentsInfoPieSkeleton } from '@/shared/ui/PercentsInfoPie';

import { QuizzesStatisticProps } from './QuizzesStatistic';

export const QuizzesStatisticSkeleton = ({ className }: QuizzesStatisticProps) => {
	return <PercentsInfoPieSkeleton className={className} attemptStatsLength={3} />;
};
