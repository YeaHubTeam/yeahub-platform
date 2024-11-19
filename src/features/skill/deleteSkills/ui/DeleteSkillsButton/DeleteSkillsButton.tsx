import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleSkills } from '../../slice/deleteSkillsSlice';

interface DeleteSkillsButtonProps {
	skillsToRemove: SelectedAdminEntities;
}

export const DeleteSkillsButton = ({ skillsToRemove }: DeleteSkillsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useI18nHelpers(i18Namespace.translation);

	const onRemoveSkills = async () => {
		await dispatch(deleteMultipleSkills(skillsToRemove));
	};

	return (
		<Button onClick={onRemoveSkills} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
