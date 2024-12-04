import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { SelectedAdminEntities } from '@/shared/types/types';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleSpecializationsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSpecializationsButtonProps {
	specializationsToRemove: SelectedAdminEntities;
}

export const DeleteSpecializationsButton = ({
	specializationsToRemove,
}: DeleteSpecializationsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useI18nHelpers(i18Namespace.translation);
	const [isModalOpen, setModalOpen] = useState(false);

	const onRemoveSpecializations = async () => {
		await dispatch(deleteMultipleSpecializationsThunk(specializationsToRemove));
	};

	return (
		<>
			<Button onClick={() => setModalOpen(!isModalOpen)} variant="destructive-tertiary">
				{t(Translation.REMOVE_SELECTED)}
			</Button>
			{isModalOpen && (
				<BlockerDialog onOk={onRemoveSpecializations} onCancel={() => setModalOpen(!isModalOpen)} />
			)}
		</>
	);
};
