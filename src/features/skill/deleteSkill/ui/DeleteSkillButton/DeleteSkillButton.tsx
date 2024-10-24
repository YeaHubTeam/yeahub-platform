import { Button, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

interface DeleteSkillButtonProps {
	skillId: Skill['id'];
}

export const DeleteSkillButton = ({ skillId }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);

	const onDeleteSkill = async () => {
		await deleteSkillMutation(skillId);
	};

	return (
		<Button
			aria-label="Large"
			style={{ width: 'auto' }}
			preffix={<Icon onClick={onDeleteSkill} icon="trash" size={20} color="--palette-ui-red-600" />}
			theme="tertiary"
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
