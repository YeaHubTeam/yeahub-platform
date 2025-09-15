import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';

interface DeleteExternalProductsButtonProps {
	externalProductsToRemove: SelectedAdminEntities;
}

export const DeleteExternalProductsButton = ({
	externalProductsToRemove,
}: DeleteExternalProductsButtonProps) => {
	const { t } = useTranslation();

	const handleDeleteMultiple = () => {
		console.log('Delete external products:', externalProductsToRemove);
	};

	return (
		<Button variant="destructive-tertiary" size="small" onClick={handleDeleteMultiple}>
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
