import { type Placement } from '@floating-ui/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { getIsVerified, getProfileId } from '@/entities/profile';
import { getHasPremiumAccess } from '@/entities/profile';

import { useResetQuestionProgressMutation } from '../api/resetQuestionStudyProgressApi';

import styles from './ResetQuestionStudyProgressButton.module.css';

export interface ResetQuestionStudyProgressProps {
	questionId: number | string;
	isPopover?: boolean;
	variant?: 'tertiary' | 'link-gray';
	checksCount: number;
	placementTooltip?: Placement;
	offsetTooltip?: number;
}

export const ResetQuestionStudyProgressButton = ({
	questionId,
	isPopover = false,
	variant = 'tertiary',
	checksCount,
	placementTooltip = 'top',
	offsetTooltip = 10,
}: ResetQuestionStudyProgressProps) => {
	const profileId = useAppSelector(getProfileId);
	const isEmailVerified = useAppSelector(getIsVerified);
	const notQuestionMaxProgress = checksCount === 0;

	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();
	const { t } = useTranslation(i18Namespace.questions);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const onResetQuestion = () => {
		resetQuestion({ profileId, questionId });
	};

	const tooltipTitle = useMemo(() => {
		if (!isEmailVerified) return Questions.TOOLTIP_NOT_CONFIRMED;
		if (!hasPremium) return Questions.TOOLTIP_MEMBERS_ONLY;
		return Questions.TOOLTIP_REPEAT;
	}, [isEmailVerified, hasPremium]);

	const iconSize = isPopover ? 20 : 24;
	const shouldShowTooltip = !isEmailVerified || !hasPremium || notQuestionMaxProgress;
	const isButtonDisabled = !isEmailVerified || !hasPremium || notQuestionMaxProgress || isLoading;

	return (
		<Tooltip
			title={t(tooltipTitle)}
			placement={placementTooltip}
			color="violet"
			offsetTooltip={offsetTooltip}
			shouldShowTooltip={shouldShowTooltip}
		>
			<Button
				className={classNames({ [styles.button]: isPopover }, styles['button-disabled'])}
				preffix={<Icon icon="clockCounterClockwise" color="black-600" size={iconSize} />}
				variant={variant}
				onClick={onResetQuestion}
				disabled={isButtonDisabled}
			>
				{t(Questions.REPEAT)}
			</Button>
		</Tooltip>
	);
};
