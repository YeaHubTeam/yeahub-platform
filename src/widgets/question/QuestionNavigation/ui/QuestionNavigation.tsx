import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import { QuestionNavigationButtons } from '@/features/question/navigateQuestion';

interface QuestionNavigationProps {
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}

export const QuestionNavigation = ({
	onMoveNext,
	onMovePrev,
	isDisabled,
}: QuestionNavigationProps) => {
	const { isMobile } = useScreenSize();

	const buttonVariant = isMobile ? 'link-gray' : 'tertiary';

	return (
		<Card withOutsideShadow>
			<QuestionNavigationButtons
				variant={buttonVariant}
				onMovePrev={onMovePrev}
				onMoveNext={onMoveNext}
				isDisabled={isDisabled}
			/>
		</Card>
	);
};
