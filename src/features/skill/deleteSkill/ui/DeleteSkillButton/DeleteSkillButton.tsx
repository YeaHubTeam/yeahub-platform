import { Button, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

interface DeleteSkillButtonProps {
	skillId: Skill['id'];
	isDetailPage?: boolean;
}

export const DeleteSkillButton = ({ skillId, isDetailPage = false }: DeleteSkillButtonProps) => {
	const [deleteSkillMutation] = useDeleteSkillMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);

	const onDeleteSkill = async () => {
		await deleteSkillMutation(skillId);
	};

	return (
		<Button
			aria-label="Large"
			style={{
				width: isDetailPage ? 'auto' : '100%',
				justifyContent: isDetailPage ? 'center' : 'flex-start',
			}}
			theme={isDetailPage ? 'destructive' : 'tertiary'}
			onClick={onDeleteSkill}
			preffix={
				isDetailPage ? undefined : <Icon icon="trash" size={20} color="--palette-ui-red-600" />
			}
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
