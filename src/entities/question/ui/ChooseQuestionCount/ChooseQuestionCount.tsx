import { useTranslation } from 'react-i18next';
import { Tooltip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Counter } from '@/shared/ui/Counter';

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
	const tooltipTitle = isTooltipVisible ? t(Questions.COUNT_TOOLTIP_UNAUTHORIZED) : undefined;

	return (
		<div style={{ maxWidth: '290px' }}>
			<Tooltip
				title={tooltipTitle}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
			>
				<h3 className={styles.title}>{t(Questions.COUNT)}</h3>
				<Counter count={count} onChange={onChange} maxCount={maxCount} />
			</Tooltip>
		</div>
	);
};
