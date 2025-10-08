import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import { useUserFilter } from '../../UsersFilterSet';

interface ResetFiltersButtonProps {
	resetSearch: () => void;
}

export const ResetFiltersButton = ({ resetSearch }: ResetFiltersButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const { handleFilterChange } = useUserFilter();

	const onResetFilters = () => {
		handleFilterChange({ roles: [], isEmailVerified: undefined });
		resetSearch?.();
	};

	return (
		<Button onClick={onResetFilters} variant="outline">
			{t(Translation.STUB_FILTER_SUBMIT)}
		</Button>
	);
};
