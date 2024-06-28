import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

const progressStatus = [
	{ id: 1, title: 'Изученные' },
	{ id: 2, title: 'Неизученные' },
	{ id: 3, title: 'Сохраненные' },
	{ id: 4, title: 'Все' },
];

export const StatusFilterSection = () => {
	return <BaseFilterSection data={progressStatus} title="Статус" />;
};
