import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

export const FeatureFlagEditFormHeaderSkeleton = () => {
	return (
		<BackHeaderSkeleton>
			<ButtonSkeleton width={170} />
		</BackHeaderSkeleton>
	);
};
