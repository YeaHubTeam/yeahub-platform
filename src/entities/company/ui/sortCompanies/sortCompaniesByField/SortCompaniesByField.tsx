import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Companies } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface SortCompaniesByFieldProps {
	changeSortBy: (orderBy: string) => void;
	selectedOrderBy?: string;
}

export const SortCompaniesByField = ({
	changeSortBy,
	selectedOrderBy,
}: SortCompaniesByFieldProps) => {
	const { t } = useTranslation(i18Namespace.companies);

	const field = [{ id: 'title', title: t(Companies.TITLE) }];

	const handleSort = (id: string) => {
		const sortKey = selectedOrderBy === id ? '' : id;
		changeSortBy(sortKey);
	};

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Companies.SORT_FIELD)} onClick={handleSort} />
	);
};
