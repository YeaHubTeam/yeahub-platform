import { AdditionalStatInfoGaugeSkeleton } from '@/shared/ui/AdditionalStatInfoGauge';

import { PreviewQuestionsStatisticProps } from './PreviewQuestionsStatistic';

export const PreviewQuestionsStatisticsSkeleton = ({
	className,
}: PreviewQuestionsStatisticProps) => {
	return (
		<AdditionalStatInfoGaugeSkeleton
			className={className}
			isActionPositionBottom
			actionTitle="actionTitle"
			actionRoute="actionRoute"
		/>
	);
};
