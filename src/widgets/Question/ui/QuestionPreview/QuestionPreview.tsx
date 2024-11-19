import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { ActionsButton, Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { IconButton } from '@/shared/ui/IconButton';
import { OpenIcon } from '@/shared/ui/Icons/OpenIcon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { QuestionParam } from '@/shared/ui/QuestionParam';
import { TextHtml } from '@/shared/ui/TextHtml';

import { useProfileQuery } from '@/entities/auth';
import { Question } from '@/entities/question';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionPreview.module.css';

type QuestionProps = {
	question: Question;
	profileId: string;
};

export const QuestionPreview = ({ question, profileId }: QuestionProps) => {
	const { id, imageSrc, complexity = 0, rate, shortAnswer, checksCount } = question;
	const { t } = useI18nHelpers([i18Namespace.translation, i18Namespace.questions]);
	const navigate = useNavigate();

	const { data: profile } = useProfileQuery();
	const isEmailVerified = profile?.isEmailVerified;

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <OpenIcon isCurrentColor />,
			title: t(ActionsButton.MORE),
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
					<QuestionParam label="Рейтинг" value={rate} />
					<QuestionParam label="Сложность" value={complexity} />
				</ul>
				<Popover menuItems={settingsMenuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to preferences"
							className={styles['details-button']}
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="S"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</div>
			{imageSrc && (
				<img
					className={styles.image}
					alt={t(Questions.IMAGE_ALT, { ns: i18Namespace.questions })}
					src={imageSrc}
				/>
			)}
			<div>
				<TextHtml html={shortAnswer} />
			</div>
		</div>
	);
};
