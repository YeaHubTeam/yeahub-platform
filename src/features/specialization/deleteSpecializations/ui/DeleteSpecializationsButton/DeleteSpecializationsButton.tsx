import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleSpecializationsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSpecializationsButtonProps {
	specializationsToRemove: SelectedAdminEntities;
}

export const DeleteSpecializationsButton = ({
	specializationsToRemove,
}: DeleteSpecializationsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveSpecializations = async () => {
		await dispatch(deleteMultipleSpecializationsThunk(specializationsToRemove));
	};

	return (
		<Button onClick={onRemoveSpecializations} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
