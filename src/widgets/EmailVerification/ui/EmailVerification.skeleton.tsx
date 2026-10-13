import { CardSkeleton } from '@/shared/ui/Card';

import { ConfirmationEmailSkeleton } from '@/features/profile/confirmationEmail';

export const EmailVerificationSkeleton = () => {
	return (
		<CardSkeleton>
			<ConfirmationEmailSkeleton />
		</CardSkeleton>
	);
};
