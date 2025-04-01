import { type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getIsEmailVerified, getProfileId } from '@/entities/profile';

import { useLearnQuestionMutation } from '../api/learnQuestionApi';

import styles from './LearnQuestionButton.module.css';

export interface LearnQuestionButtonProps {
	questionId: number | string;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	checksCount: number;
	placementTooltip?: Placement;
	offsetTooltip?: number;
}

export const LearnQuestionButton = ({
	questionId,
	isPopover = false,
	variant = 'tertiary',
	checksCount,
	placementTooltip = 'top',
	offsetTooltip = 10,
}: LearnQuestionButtonProps) => {
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsEmailVerified);
	const hasQuestionMaxProgress = checksCount >= 3;

	const [learnQuestion, { isLoading }] = useLearnQuestionMutation();
	const { t } = useTranslation(i18Namespace.questions);
	const onLearnQuestion = () => {
		learnQuestion({
			profileId: String(profileId),
			questionId: Number(questionId),
			isLearned: true,
		});
	};

	const iconSize = isPopover ? 20 : 24;

	return (
		<Tooltip
			title={t(Questions.TOOLTIP_LEARN)}
			placement={placementTooltip}
			color="violet"
			offsetTooltip={offsetTooltip}
			shouldShowTooltip={hasQuestionMaxProgress}
		>
			<Button
				className={classNames({ [styles.button]: isPopover }, styles['button-disabled'])}
				preffix={<Icon icon="student" color="black-600" size={iconSize} />}
				variant={variant}
				onClick={onLearnQuestion}
				disabled={isLoading || !isEmailVerified || hasQuestionMaxProgress}
			>
				{t(Questions.LEARN)}
			</Button>
		</Tooltip>
	);
};
