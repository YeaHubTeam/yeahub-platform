import { AdditionalStatInfoGaugeSkeleton } from '@/shared/ui/AdditionalStatInfoGauge';

import { FullQuestionsStatisticProps } from './FullQuestionsStatistic';

export const FullQuestionsStatisticSkeleton = ({ className }: FullQuestionsStatisticProps) => {
	return <AdditionalStatInfoGaugeSkeleton className={className} />;
};
