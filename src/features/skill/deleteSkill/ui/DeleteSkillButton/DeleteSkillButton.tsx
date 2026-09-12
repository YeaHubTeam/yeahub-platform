import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

export interface DeleteSkillButtonProps {
	skillId: Skill['id'];
	isDetailPage?: boolean;
}

export const DeleteSkillButton = ({ skillId, isDetailPage = false }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const onDeleteSkill = () => {
		deleteSkillMutation(skillId);
	};

	return <DeleteButton onDelete={onDeleteSkill} isDetailPage={isDetailPage} showTooltip={false} />;
};
