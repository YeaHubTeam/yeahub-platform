import { AdditionalStatInfoGaugeSkeleton } from '@/shared/ui/AdditionalStatInfoGauge';

import { QuizAdditionalInfoProps } from './QuizAdditionalInfo';

export const QuizAdditionalInfoSkeleton = ({ className }: QuizAdditionalInfoProps) => {
	return <AdditionalStatInfoGaugeSkeleton className={className} />;
};
