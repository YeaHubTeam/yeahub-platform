import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { PremiumSubscriptionTab } from '../PremiumSubscriptionTab/PremiumSubscriptionTab';
import { getFullProfile } from '@/entities/profile';

export const SubscriptionTab = () => {
	const profile = useAppSelector(getFullProfile);
	const currentUserRole: string | undefined = profile?.userRoles[0].name;

	/**
	 *  `30` - Общее кол-во дней
	 *
	 *  `20` - оставшиеся дни
	 */

	return (
		<>
			{currentUserRole === 'candidate-premium' ? (
				<PremiumSubscriptionTab />
			) : (
				'На этом месте должна стоять не премиальная подписка!'
			)}
		</>
	);
};
