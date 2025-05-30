import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Tooltip } from '@/shared/ui/Tooltip';

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
	const QUESTIONS_COMPLEXITY = [
		{ id: 1, title: '1-3', value: [1, 2, 3] },
		{ id: 2, title: '4-6', value: [4, 5, 6] },
		{ id: 3, title: '7-8', value: [7, 8] },
		{ id: 4, title: '9-10', value: [9, 10] },
	];

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
				title={t(Questions.COMPLEXITY_TOOLTIP_UNAUTHORIZED)}
				placement="top"
				color="violet"
				offsetTooltip={0}
				tooltipDelay={{ open: 0, close: 150 }}
				shouldShowTooltip={disabled || false}
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
