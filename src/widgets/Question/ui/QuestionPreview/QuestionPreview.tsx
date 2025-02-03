import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { IconButton } from '@/shared/ui/IconButton';
import { OpenIcon } from '@/shared/ui/Icons/OpenIcon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getFullProfile } from '@/entities/profile';
import { Question } from '@/entities/question';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import { DisplayMode } from '../QuestionsFilterPanel/model/types';

import styles from './QuestionPreview.module.css';

type QuestionProps = {
	question: Question;
	profileId?: string;
	displayMode?: DisplayMode;
};

export const QuestionPreview = ({ question, displayMode = 'popover' }: QuestionProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer, checksCount } = question;
	const { t } = useTranslation([i18Namespace.translation, i18Namespace.questions]);
	const navigate = useNavigate();

	const profile = useAppSelector(getFullProfile);
	const isEmailVerified = profile?.isEmailVerified;
	const profileId = profile?.profiles?.[0].id || '';

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <OpenIcon isCurrentColor />,
			title: t(Questions.MORE, { ns: i18Namespace.questions }),
			onClick: () => {
				navigate(route(ROUTES.interview.questions.detail.page, id));
			},
		},
		{
			renderComponent: (onToggleOpenPopover) => (
				<LearnQuestionButton
					profileId={profileId}
					questionId={id}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount >= 3)}
					onSuccess={onToggleOpenPopover}
					isPopover
				/>
			),
		},
		{
			renderComponent: (onToggleOpenPopover) => (
				<ResetQuestionStudyProgressButton
					profileId={profileId}
					questionId={id}
					isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount === 0)}
					onSuccess={onToggleOpenPopover}
					isPopover
				/>
			),
		},
	];

	return (
		<div>
			<div className={styles.header}>
				<ul className={styles['header-params']}>
					<QuestionParam
						label={t(Questions.RATE_TITLE_SHORT, { ns: i18Namespace.questions })}
						value={rate}
					/>
					<QuestionParam
						label={t(Questions.COMPLEXITY_TITLE_SHORT, { ns: i18Namespace.questions })}
						value={complexity}
					/>
				</ul>
				{displayMode === 'popover' && (
					<Popover menuItems={settingsMenuItems}>
						{({ onToggle }) => (
							<IconButton
								aria-label="go to preferences"
								form="square"
								icon={<Icon icon="dotsThreeVertical" />}
								size="S"
								variant="tertiary"
								onClick={onToggle}
							/>
						)}
					</Popover>
				)}
			</div>
			{imageSrc && (
				<div className={styles['image-wrapper']}>
					<img
						className={styles.image}
						alt={t(Questions.IMAGE_ALT, { ns: i18Namespace.questions })}
						src={imageSrc}
					/>
				</div>
			)}
			<div className={styles.answer}>
				<TextHtml html={shortAnswer} />
			</div>
			{displayMode === 'link' && (
				<Button
					variant="link"
					size="L"
					className={styles.link}
					suffix={<ArrowRight height={24} width={24} />}
					onClick={() => {
						navigate(route(ROUTES.questions.detail.page, id));
					}}
				>
					{t(Questions.MORE, { ns: i18Namespace.questions })}
				</Button>
			)}
		</div>
	);
};
