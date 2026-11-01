import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { QuestionGradeList } from '@/entities/question';
import { TestQuestion } from '@/entities/testQuestion';

import { FavoriteQuestionButton } from '@/features/question/favoriteQuestion';
import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './TestQuestionItem.module.css';

interface TestQuestionItemProps {
	testQuestion: TestQuestion;
}

export const TestQuestionItem = ({ testQuestion }: TestQuestionItemProps) => {
	const { t: tQuestion } = useTranslation(i18Namespace.questions);

	const { id, imageSrc, rate, complexity, description } = testQuestion;

	const checksCount = 0;

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <Icon icon="more" color="black-600" size={20} />,
			title: tQuestion(Questions.MORE),
			onClick: () => {
				// TODO: добавить переход на страницу тестового вопроса после определения маршрута.
			},
		},
		{
			renderComponent: () => (
				<LearnQuestionButton
					checksCount={checksCount}
					questionId={id}
					isPopover
					placementTooltip="left"
					offsetTooltip={20}
					isDisabled
				/>
			),
		},
		{
			renderComponent: () => (
				<ResetQuestionStudyProgressButton
					checksCount={checksCount}
					questionId={id}
					isPopover
					placementTooltip="left"
					offsetTooltip={20}
					isDisabled
				/>
			),
		},
		{
			renderComponent: () => (
				<FavoriteQuestionButton
					questionId={id}
					isPopover
					placementTooltip="left"
					offsetTooltip={20}
					isDisabled
				/>
			),
		},
	];

	return (
		<Flex direction="column" gap="24" className={styles.item}>
			<Flex justify="between" align="center" className={styles.header}>
				<QuestionGradeList
					rate={rate}
					complexity={complexity}
					className={styles['header-params']}
				/>

				<Popover menuItems={settingsMenuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="question actions"
							form="square"
							icon={<Icon icon="dotsThreeVertical" size={20} color="black-600" />}
							size="small"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>

			{imageSrc && (
				<div className={styles['image-wrapper']}>
					<img className={styles.image} alt={description} src={imageSrc} loading="lazy" />
				</div>
			)}

			{description && <p className={styles.description}>{description}</p>}
		</Flex>
	);
};
