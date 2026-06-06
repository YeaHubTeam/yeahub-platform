import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

interface DeleteSkillButtonProps {
	skillId: Skill['id'];
	isDetailPage?: boolean;
}

export const DeleteSkillButton = ({ skillId, isDetailPage = false }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const onDeleteSkill = async (id: Skill['id']) => {
		await deleteSkillMutation(id).unwrap();
	};

	return (
		<DeleteButton
			id={skillId}
			onDelete={onDeleteSkill}
			isDetailPage={isDetailPage}
			showTooltip={false}
		/>
	);
};
