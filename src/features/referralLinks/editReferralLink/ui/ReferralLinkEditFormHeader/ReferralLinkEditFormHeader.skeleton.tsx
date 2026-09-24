import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';

export const ReferralLinkEditFormHeaderSkeleton = () => {
	return (
		<BackHeaderSkeleton>
			<ButtonSkeleton variant="secondary" width={140} />
			<ButtonSkeleton width={147} />
		</BackHeaderSkeleton>
	);
};
