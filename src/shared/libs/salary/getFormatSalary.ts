import { Vacancies } from '@/shared/config';

export const getFormatSalary = (
	from: number | null,
	to: number | null,
	currency: string | null,
	t: (key: string) => string,
) => {
	if (!from && !to) return null;

	const isBrief = currency !== 'USD' && currency !== 'EUR';

	const formatValue = (value: number) => {
		if (isBrief && value >= 1000) {
			return Math.round(value / 1000).toString();
		} else {
			return value.toLocaleString('ru-RU');
		}
	};

	if (from && to) {
		return `${formatValue(from)}-${formatValue(to)}${isBrief ? 'К' : ''} ${currency ?? ''}`;
	}

	if (from) {
		return `${t(Vacancies.SALARY_FROM)} ${formatValue(from)}${isBrief ? 'К' : ''} ${currency ?? ''}`;
	}

	if (to) {
		return `${t(Vacancies.SALARY_TO)} ${formatValue(to)}${isBrief ? 'К' : ''} ${currency ?? ''}`;
	}

	return null;
};
