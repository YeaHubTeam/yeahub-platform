import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getHasPremiumAccess } from '@/entities/profile';

import { FreeSubscriptionTab } from '../FreeSubscriptionTab/FreeSubscriptionTab';
import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';

export const SubscriptionTab = () => {
	const hasPremium = useAppSelector(getHasPremiumAccess);

	return <>{hasPremium ? <PremiumSubscriptionTab /> : <FreeSubscriptionTab />}</>;
};
