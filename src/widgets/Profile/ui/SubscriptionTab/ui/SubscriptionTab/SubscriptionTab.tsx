import { useProfileQuery } from '@/entities/auth';

import { FreeSubscriptionTab } from '../FreeSubscriptionTab/FreeSubscriptionTab';
import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';

export const SubscriptionTab = () => {
	const roles = useProfileQuery();

	const hasPremium = roles.data?.userRoles.some((role) => role.name === 'candidate-premium');

	return <>{hasPremium ? <PremiumSubscriptionTab /> : <FreeSubscriptionTab />}</>;
};
