import { useScreenSize } from '@/shared/hooks';
import { CardSkeleton } from '@/shared/ui/Card';

import { QuestionNavigationButtonsSkeleton } from '@/features/question/navigateQuestion';

export const QuestionNavigationSkeleton = () => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<CardSkeleton withOutsideShadow>
			<QuestionNavigationButtonsSkeleton width={160} variant={buttonVariant} />
		</CardSkeleton>
	);
};
