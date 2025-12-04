import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

export interface QuestionNavigationButtonsProps {
	variant?: 'tertiary' | 'link-gray';
	onMovePrev: () => void;
	onMoveNext: () => void;
	isDisabled: boolean;
}

export const QuestionNavigationButtons = ({
	variant,
	onMoveNext,
	onMovePrev,
	isDisabled,
}: QuestionNavigationButtonsProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<Flex justify="center" gap="20">
			<Button
				variant={variant}
				preffix={<Icon icon="altArrowLeft" color="black-600" size={24} />}
				onClick={onMovePrev}
				disabled={isDisabled}
			>
				{t(Questions.NAVIGATION_PREVIOUS)}
			</Button>
			<Button
				variant={variant}
				suffix={<Icon icon="altArrowRight" color="black-600" size={24} />}
				onClick={onMoveNext}
				disabled={isDisabled}
			>
				{t(Questions.NAVIGATION_NEXT)}
			</Button>
		</Flex>
	);
};
