import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '../../api/deleteSkillApi';

import styles from './DeleteSkillButton.module.css';

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
			aria-label="Delete"
			className={classNames({ [styles['detail-button']]: !isDetailPage })}
			preffix={
				!isDetailPage ? <Icon icon="trash" size={24} color="--palette-ui-red-600" /> : undefined
			}
			variant={isDetailPage ? 'destructive' : 'tertiary'}
			onClick={onDeleteSkill}
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
