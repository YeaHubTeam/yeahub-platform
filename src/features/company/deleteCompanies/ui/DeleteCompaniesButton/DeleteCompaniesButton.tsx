import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleCompaniesThunk } from '../../model/thunks/deleteMultipleCompaniesThunk';

interface DeleteCompaniesButtonProps {
	companiesToRemove: SelectedAdminEntities;
}

export const DeleteCompaniesButton = ({ companiesToRemove }: DeleteCompaniesButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveCompanies = async () => {
		await dispatch(deleteMultipleCompaniesThunk(companiesToRemove));
	};

	return (
		<Button onClick={onRemoveCompanies} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
