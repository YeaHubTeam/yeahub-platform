import classNames from 'classnames';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '../../api/deleteSpecializationApi';

import styles from './DeleteSpecializationButton.module.css';

interface DeleteSpecializationButtonProps {
	specializationId: Specialization['id'];
	isDetailPage?: boolean;
}

export const DeleteSpecializationButton = ({
	specializationId,
	isDetailPage = false,
}: DeleteSpecializationButtonProps) => {
	const [deleteSpecializationMutation] = useDeleteSpecializationMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);

	const onDelete = async () => {
		await deleteSpecializationMutation(specializationId);
	};

	return (
		<Button
			aria-label="Delete"
			className={classNames({ [styles['detail-button']]: !isDetailPage })}
			preffix={
				!isDetailPage ? <Icon icon="trash" size={24} color="--palette-ui-red-600" /> : undefined
			}
			variant={isDetailPage ? 'destructive' : 'tertiary'}
			onClick={onDelete}
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
