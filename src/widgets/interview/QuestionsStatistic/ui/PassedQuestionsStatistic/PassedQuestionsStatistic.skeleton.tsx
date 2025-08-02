import { AdditionalStatInfoGaugeSkeleton } from '@/shared/ui/AdditionalStatInfoGauge';

import { PassedQuestionsStatisticProps } from './PassedQuestionsStatistic';

export const PassedQuestionsStatisticSkeleton = ({ className }: PassedQuestionsStatisticProps) => {
	return <AdditionalStatInfoGaugeSkeleton className={className} />;
};
