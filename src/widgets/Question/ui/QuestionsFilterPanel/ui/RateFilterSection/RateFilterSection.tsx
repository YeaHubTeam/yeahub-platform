import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

const rate = [
	{ id: 1, title: '1' },
	{ id: 2, title: '2' },
	{ id: 3, title: '3' },
	{ id: 4, title: '4' },
	{ id: 5, title: '5' },
];

export const RateFilterSection = () => {
	return <BaseFilterSection data={rate} title="Рейтинг вопросов" />;
};
