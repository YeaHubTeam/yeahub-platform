import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { TextHtml } from '@/shared/ui/TextHtml';

import { Question, QuestionGradeList } from '@/entities/question';

import { FavoriteQuestionButton } from '@/features/question/favoriteQuestion';
import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './FullQuestionItem.module.css';

interface FullQuestionItemProps {
	question: Question;
	isPublic?: boolean;
	onMoveQuestionDetail: (id: number) => void;
}

export const FullQuestionItem = ({
	question,
	isPublic = false,
	onMoveQuestionDetail,
}: FullQuestionItemProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer, checksCount = 0, isFavorite } = question;
	const { t } = useTranslation(i18Namespace.questions);

	const onMoveDetail = () => {
		onMoveQuestionDetail(id);
	};

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <Icon icon="more" color="black-600" size={20} />,
			title: t(Questions.MORE),
			onClick: onMoveDetail,
		},
		{
			renderComponent: () => (
				<LearnQuestionButton
					checksCount={checksCount}
					questionId={id}
					isPopover
					placementTooltip="left"
					offsetTooltip={20}
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
					isFavorite={isFavorite}
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
				{!isPublic && (
					<Popover menuItems={settingsMenuItems}>
						{({ onToggle }) => (
							<IconButton
								aria-label="go to preferences"
								form="square"
								icon={<Icon icon="dotsThreeVertical" size={20} color="black-600" />}
								size="small"
								variant="tertiary"
								onClick={onToggle}
							/>
						)}
					</Popover>
				)}
			</Flex>
			{imageSrc && (
				<div className={styles['image-wrapper']}>
					<img
						className={styles.image}
						alt={t(Questions.IMAGE_ALT)}
						src={imageSrc}
						loading="lazy"
					/>
				</div>
			)}
			<TextHtml html={shortAnswer} />
			{isPublic && (
				<Button
					variant="link"
					size="large"
					className={styles.link}
					suffix={<Icon icon="arrowRight" size={24} />}
					onClick={onMoveDetail}
				>
					{t(Questions.MORE)}
				</Button>
			)}
		</Flex>
	);
};
