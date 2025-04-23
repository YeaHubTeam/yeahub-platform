import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleSkillsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSkillsButtonProps {
	skillsToRemove: SelectedAdminEntities;
}

export const DeleteSkillsButton = ({ skillsToRemove }: DeleteSkillsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveSkills = async () => {
		await dispatch(deleteMultipleSkillsThunk(skillsToRemove));
	};

	return (
		<Button onClick={onRemoveSkills} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
