import { Button, Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '../../api/deleteSpecializationApi';

interface DeleteSpecializationButtonProps {
	specializationId: Specialization['id'];
}

export const DeleteSpecializationButton = ({
	specializationId,
}: DeleteSpecializationButtonProps) => {
	const [deleteSpecializationMutation] = useDeleteSpecializationMutation();

	const { t } = useI18nHelpers(i18Namespace.translation);

	const onDelete = async () => {
		await deleteSpecializationMutation(specializationId);
	};

	return (
		<Button
			aria-label="Large"
			style={{ width: 'auto', justifyContent: 'flex-start' }}
			preffix={<Icon onClick={onDelete} icon="trash" size={20} color="--palette-ui-red-600" />}
			theme="tertiary"
		>
			{t(Translation.DELETE)}
		</Button>
	);
};
