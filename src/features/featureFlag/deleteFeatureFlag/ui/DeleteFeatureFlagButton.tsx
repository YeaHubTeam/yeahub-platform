import { FeatureFlags } from '@/shared/config';
import { DeleteButton } from '@/shared/ui/DeleteButton';

import { useDeleteFeatureFlagMutation } from '../api/deleteFeatureFlagApi';

export interface DeleteFeatureFlagButtonProps {
	featureFlagId: string;
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteFeatureFlagButton = ({
	featureFlagId,
	isDetailPage = false,
	disabled = false,
}: DeleteFeatureFlagButtonProps) => {
	const [deleteFeatureFlag] = useDeleteFeatureFlagMutation();

	const onDeleteFeatureFlag = () => {
		deleteFeatureFlag(featureFlagId);
	};

	return (
		<DeleteButton
			onDelete={onDeleteFeatureFlag}
			isDetailPage={isDetailPage}
			disabled={disabled}
			tooltipTitle={FeatureFlags.TOOLTIP_FEATURE_FLAGS_DISABLED_INFO}
			modalMessage={FeatureFlags.MODAL_FEATURE_FLAG_DELETE_DESCRIPTION}
		/>
	);
};
