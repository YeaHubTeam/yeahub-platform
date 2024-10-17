import { Icon } from 'yeahub-ui-kit';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

interface DeleteSkillButtonProps {
	skillId: Skill['id'];
}

export const DeleteSkillButton = ({ skillId }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const onDeleteSkill = async () => {
		await deleteSkillMutation(skillId);
	};

	return <Icon onClick={onDeleteSkill} icon="trash" size={20} color="--palette-ui-red-600" />;
};
