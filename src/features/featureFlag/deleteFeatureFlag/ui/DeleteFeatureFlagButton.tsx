import { FeatureFlags } from '@/shared/config';
import { DeleteButton } from '@/shared/ui/DeleteButton';

import { useDeleteFeatureFlagMutation } from '../api/deleteFeatureFlagApi';

interface DeleteFeatureFlagButtonProps {
	featureFlagId: string;
	isDetailPage?: boolean;
	disabled?: boolean;
	onSuccess?: () => void;
}

export const DeleteFeatureFlagButton = ({
	featureFlagId,
	isDetailPage = false,
	disabled = false,
	onSuccess,
}: DeleteFeatureFlagButtonProps) => {
	const [deleteFeatureFlag] = useDeleteFeatureFlagMutation();

	const onDeleteFeatureFlag = async (id: string) => {
		await deleteFeatureFlag(id).unwrap();
	};

	return (
		<DeleteButton
			id={featureFlagId}
			onDelete={onDeleteFeatureFlag}
			onSuccess={onSuccess}
			isDetailPage={isDetailPage}
			disabled={disabled}
			tooltipTitle={FeatureFlags.TOOLTIP_FEATURE_FLAGS_DISABLED_INFO}
			modalMessage={FeatureFlags.MODAL_FEATURE_FLAG_DELETE_DESCRIPTION}
		/>
	);
};
