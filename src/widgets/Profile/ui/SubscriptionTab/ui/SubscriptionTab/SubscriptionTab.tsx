import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';

import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';

export const SubscriptionTab = () => {
	const profile = useAppSelector(getFullProfile);
	const currentUserRole: string | undefined = profile?.userRoles[0].name;
	const userId = profile?.id;

	/**
	 *  `30` - Общее кол-во дней
	 *
	 *  `20` - оставшиеся дни
	 */

	if (userId && currentUserRole === 'candidate-premium') {
		return <PremiumSubscriptionTab userId={userId} />;
	} else {
		return <></>;
	}
};
