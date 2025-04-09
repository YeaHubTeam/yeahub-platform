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
	const isEmailVerified = useAppSelector(getIsEmailVerified);
	const notQuestionMaxProgress = checksCount === 0;

	const [resetQuestion, { isLoading }] = useResetQuestionProgressMutation();
	const { t } = useTranslation(i18Namespace.questions);

	const onResetQuestion = () => {
		resetQuestion({ profileId, questionId });
	};

	const iconSize = isPopover ? 20 : 24;

	return (
		<Tooltip
			title={t(Questions.TOOLTIP_REPEAT)}
			placement={placementTooltip}
			color="violet"
			offsetTooltip={offsetTooltip}
			shouldShowTooltip={notQuestionMaxProgress}
		>
			<Button
				className={classNames({ [styles.button]: isPopover }, styles['button-disabled'])}
				preffix={<Icon icon="clockCounterClockwise" color="black-600" size={iconSize} />}
				variant={variant}
				onClick={onResetQuestion}
				disabled={isLoading || !isEmailVerified || notQuestionMaxProgress}
			>
				{t(Questions.REPEAT)}
			</Button>
		</Tooltip>
	);
};
