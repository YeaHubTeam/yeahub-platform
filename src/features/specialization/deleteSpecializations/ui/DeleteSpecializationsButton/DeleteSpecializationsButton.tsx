import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleSpecializations } from '../../slice/deleteSpecializationsSlice';

interface DeleteSpecializationsButtonProps {
	specializationsToRemove: SelectedAdminEntities;
}

export const DeleteSpecializationsButton = ({
	specializationsToRemove,
}: DeleteSpecializationsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useI18nHelpers(i18Namespace.translation);

	const onRemoveSpecializations = async () => {
		await dispatch(deleteMultipleSpecializations(specializationsToRemove));
	};

	return (
		<Button onClick={onRemoveSpecializations} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
