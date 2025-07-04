import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';
import { getActiveSubscription, useGetUserSubscriptionQuery } from '@/entities/subscription';

import { FreeSubscriptionTab } from '../FreeSubscriptionTab/FreeSubscriptionTab';
import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';

export const SubscriptionTab = () => {
	const { id } = useAppSelector(getFullProfile);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data } = useGetUserSubscriptionQuery(id ?? '');
	const activeSubscriptions = useAppSelector(getActiveSubscription);

	const isInactiveState = activeSubscriptions?.state === 'inactive' || !activeSubscriptions;

	return <>{!isInactiveState ? <PremiumSubscriptionTab /> : <FreeSubscriptionTab />}</>;
};
