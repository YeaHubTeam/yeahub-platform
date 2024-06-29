import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

const complexity = [
	{ id: 1, title: '1-3', value: [1, 2, 3] },
	{ id: 2, title: '4-6', value: [4, 5, 6] },
	{ id: 3, title: '7-8', value: [7, 8] },
	{ id: 4, title: '9-10', value: [9, 10] },
];

interface ComplexityFilterSectionProps {
	selectedComplexity?: number[];
	onChangeComplexity: (complexity: number[]) => void;
}

export const ComplexityFilterSection = ({
	onChangeComplexity,
	selectedComplexity,
}: ComplexityFilterSectionProps) => {
	const onClick = (id: number) => {
		const newValues = complexity.find((item) => item.id === id)?.value || [];
		const isDataExist = selectedComplexity?.some((item) => newValues.includes(item));
		const updates = isDataExist
			? (selectedComplexity || []).filter((item) => !newValues.includes(item))
			: [...(selectedComplexity || []), ...newValues];
		onChangeComplexity(updates);
	};

	const preparedData = complexity.map((item) => ({
		...item,
		active: selectedComplexity?.some((selectedItem) => item.value.includes(selectedItem)),
	}));
	return <BaseFilterSection data={preparedData} title="Сложность вопросов" onClick={onClick} />;
};
