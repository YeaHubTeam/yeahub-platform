import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getIsEmailVerified, getProfileId, getHasPremiumAccess } from '@/entities/profile';
import { Question } from '@/entities/question';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './FullQuestionItem.module.css';

interface FullQuestionItemProps {
	question: Question;
	isPublic?: boolean;
}

export const FullQuestionItem = ({ question, isPublic = false }: FullQuestionItemProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer, checksCount } = question;
	const { t } = useTranslation(i18Namespace.questions);
	const navigate = useNavigate();

	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);

	const onMoveDetail = () => {
		const path = isPublic ? ROUTES.questions.detail.page : ROUTES.interview.questions.detail.page;
		navigate(route(path, id));
	};

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <Icon icon="more" color="black-600" size={20} />,
			title: t(Questions.MORE),
			onClick: onMoveDetail,
		},
		{
			renderComponent: (onToggleOpenPopover) => (
				<LearnQuestionButton
					profileId={profileId}
					questionId={id}
					isDisabled={
						!isEmailVerified || !hasPremiumAccess || (checksCount !== undefined && checksCount >= 3)
					}
					onSuccess={onToggleOpenPopover}
					isPopover
					isSmallIcon
				/>
			),
		},
		{
			renderComponent: (onToggleOpenPopover) => (
				<ResetQuestionStudyProgressButton
					profileId={profileId}
					questionId={id}
					isDisabled={
						!isEmailVerified ||
						!hasPremiumAccess ||
						(checksCount !== undefined && checksCount === 0)
					}
					onSuccess={onToggleOpenPopover}
					isPopover
					isSmallIcon
				/>
			),
		},
	];

	return (
		<Flex direction="column" gap="24" className={styles.item}>
			<Flex justify="between" align="center" className={styles.header}>
				<Flex componentType="ul" gap="40" className={styles['header-params']}>
					<QuestionParam label={t(Questions.RATE_TITLE_SHORT)} value={rate} />
					<QuestionParam label={t(Questions.COMPLEXITY_TITLE_SHORT)} value={complexity} />
				</Flex>
				{!isPublic && (
					<Popover menuItems={settingsMenuItems}>
						{({ onToggle }) => (
							<IconButton
								aria-label="go to preferences"
								form="square"
								icon={<Icon icon="dotsThreeVertical" size={20} color="black-600" />}
								size="S"
								variant="tertiary"
								onClick={onToggle}
							/>
						)}
					</Popover>
				)}
			</Flex>
			{imageSrc && (
				<div className={styles['image-wrapper']}>
					<img className={styles.image} alt={t(Questions.IMAGE_ALT)} src={imageSrc} />
				</div>
			)}
			<TextHtml html={shortAnswer} />
			{isPublic && (
				<Button
					variant="link"
					size="L"
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
