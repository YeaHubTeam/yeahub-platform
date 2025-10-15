import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

interface ResetFiltersButtonProps {
	onResetFilters: () => void;
}

export const ResetFiltersButton = ({ onResetFilters }: ResetFiltersButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<Button onClick={onResetFilters} variant="outline">
			{t(Translation.STUB_FILTER_SUBMIT)}
		</Button>
	);
};
