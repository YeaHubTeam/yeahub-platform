import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';
import { getActiveSubscription, useGetUserSubscriptionQuery } from '@/entities/subscription';

import { FreeSubscription } from './FreeSubscription/FreeSubscription';
import { PremiumSubscription } from './PremiumSubscription/PremiumSubscription';

export const SubscriptionManager = () => {
	const { id } = useAppSelector(getFullProfile);
	useGetUserSubscriptionQuery(id ?? '');
	const activeSubscriptions = useAppSelector(getActiveSubscription);

	const isInactiveState = activeSubscriptions?.state === 'inactive' || !activeSubscriptions;

	return <>{isInactiveState ? <FreeSubscription /> : <PremiumSubscription />}</>;
};
