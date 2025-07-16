import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate, Questions } from '@/shared/config/i18n/i18nTranslations';
import { Counter } from '@/shared/ui/Counter';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import styles from './ChooseQuestionCount.module.css';

interface ChooseQuestionCountProps {
	onChangeLimit: (limit: number) => void;
	count: number;
	maxCount?: number;
	disabled?: boolean;
	hasPremium?: boolean;
}

export const ChooseQuestionCount = ({
	onChangeLimit,
	count,
	maxCount,
	disabled,
	hasPremium,
}: ChooseQuestionCountProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const { t: tInterview } = useTranslation(i18Namespace.interviewQuizCreate);

	const onChange = (counter: number) => {
		onChangeLimit(counter);
	};

	const isTooltipVisible = disabled && maxCount !== undefined && count >= maxCount;
	const tooltipTitle = !hasPremium
		? tInterview(InterviewQuizCreate.MODE_SELECT_TOOLTIP_PREMIUMONLY)
		: t(Questions.COMPLEXITY_TOOLTIP_UNAUTHORIZED);
	return (
		<div style={{ maxWidth: '290px' }}>
			<Tooltip
				title={tooltipTitle}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
				shouldShowTooltip={isTooltipVisible || false}
			>
				<Text className={styles.title} variant="body3">
					{t(Questions.COUNT)}
				</Text>
				<Counter count={count} onChange={onChange} maxCount={maxCount} />
			</Tooltip>
		</div>
	);
};
