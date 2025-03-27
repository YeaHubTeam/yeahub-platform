import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Counter } from '@/shared/ui/Counter';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import styles from './ChooseQuestionCount.module.css';

interface ChooseQuestionCountProps {
	onChangeLimit: (limit: number) => void;
	count: number;
	maxCount?: number;
	disabled?: boolean;
}

export const ChooseQuestionCount = ({
	onChangeLimit,
	count,
	maxCount,
	disabled,
}: ChooseQuestionCountProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const onChange = (counter: number) => {
		onChangeLimit(counter);
	};

	const isTooltipVisible = disabled && maxCount !== undefined && count >= maxCount;

	return (
		<div style={{ maxWidth: '290px' }}>
			<Tooltip
				title={t(Questions.COUNT_TOOLTIP_UNAUTHORIZED)}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
				shouldShowTooltip={isTooltipVisible}
			>
				<Text className={styles.title} variant="body3">
					{t(Questions.COUNT)}
				</Text>
				<Counter count={count} onChange={onChange} maxCount={maxCount} />
			</Tooltip>
		</div>
	);
};
