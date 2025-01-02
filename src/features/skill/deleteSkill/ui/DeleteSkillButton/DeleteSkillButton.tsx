import { useState } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

interface DeleteSkillButtonProps {
	skillId: Skill['id'];
	isDetailPage?: boolean;
}

export const DeleteSkillButton = ({ skillId, isDetailPage = false }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const onCloseDeleteModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const onDeleteSkill = async () => {
		await deleteSkillMutation(skillId);
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{
					width: isDetailPage ? 'auto' : '100%',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={onCloseDeleteModal}
				preffix={
					isDetailPage ? undefined : <Icon icon="trash" size={20} color="--palette-ui-red-600" />
				}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					onOk={onDeleteSkill}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.BLOCKMODAL_CONFIRM_DELETE}
				/>
			)}
		</>
	);
};
