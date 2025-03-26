import { useTranslation } from 'react-i18next';
import { Tooltip } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { QUESTIONS_COMPLEXITY } from '@/shared/constants/queryConstants';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface ChooseQuestionComplexityProps {
	selectedComplexity?: number[];
	onChangeComplexity: (complexity?: number[]) => void;
	disabled?: boolean;
}

export const ChooseQuestionComplexity = ({
	selectedComplexity,
	onChangeComplexity,
	disabled,
}: ChooseQuestionComplexityProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const onChooseComplexity = (id: number) => {
		const newValues = QUESTIONS_COMPLEXITY.find((item) => item.id === id)?.value || [];
		const isDataExist = selectedComplexity?.some((item) => newValues.includes(item));
		const updates = isDataExist
			? (selectedComplexity || []).filter((item) => !newValues.includes(item))
			: [...(selectedComplexity || []), ...newValues];
		onChangeComplexity(updates.length === 0 ? undefined : updates);
	};

	const preparedData = QUESTIONS_COMPLEXITY.map((item) => ({
		...item,
		active: selectedComplexity?.some((selectedItem) => item.value.includes(selectedItem)),
	}));

	return (
		<div style={{ maxWidth: '290px' }}>
			<Tooltip
				title={disabled && t(Questions.COMPLEXITY_TOOLTIP_UNAUTHORIZED)}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
			>
				<BaseFilterSection
					data={preparedData}
					title={t(Questions.COMPLEXITY_TITLE)}
					onClick={onChooseComplexity}
					disabled={disabled}
				/>
			</Tooltip>
		</div>
	);
};
