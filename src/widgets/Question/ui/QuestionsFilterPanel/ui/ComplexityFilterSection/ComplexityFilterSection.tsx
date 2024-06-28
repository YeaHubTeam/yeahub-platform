import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

const complexity = [
	{ id: 1, title: '1-3', value: [1, 2, 3] },
	{ id: 2, title: '3-6', value: [3, 4, 5, 6] },
	{ id: 3, title: '7-8', value: [7, 8] },
	{ id: 4, title: '9-10', value: [9, 10] },
];

export const ComplexityFilterSection = () => {
	return <BaseFilterSection data={complexity} title="Сложность вопросов" />;
};
