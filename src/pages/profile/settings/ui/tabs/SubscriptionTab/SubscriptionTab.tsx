import { useAppSelector } from '@/shared/libs';

import { getFullProfile } from '@/entities/profile';
import { getActiveSubscription, useGetUserSubscriptionQuery } from '@/entities/subscription';

import { FreeSubscriptionTab } from '../FreeSubscriptionTab/FreeSubscriptionTab';
import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';

export const SubscriptionTab = () => {
	const { id } = useAppSelector(getFullProfile);
	useGetUserSubscriptionQuery(id ?? '');
	const activeSubscriptions = useAppSelector(getActiveSubscription);
	const isInactiveState = activeSubscriptions?.state === 'inactive' || !activeSubscriptions;

	return <>{isInactiveState ? <FreeSubscriptionTab /> : <PremiumSubscriptionTab />}</>;
};
